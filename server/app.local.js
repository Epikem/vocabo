var express = require('express');
var cors = require('cors');
var app = express();
const request = require('request');
var { Client } = require('@elastic/elasticsearch');
const customDomainReroute = require('@turinggroup/serverless-express-custom-domain-middleware').customDomainReroute
var Dictionary = require('./dictionary');
require('dotenv').config();

app.use(cors());
app.use(customDomainReroute);


// let dictionary='';

const client = new Client({
    node: {
        url: new URL(process.env.ELASTICSEARCH_URL || 'http://localhost')
    }
})

const dictionary = new Dictionary();

var client_id = process.env.NAVER_ID;
var client_secret = process.env.NAVER_SECRET;

// function loadDictionary(url, callback) {
//   if(dictionary!='') return dictionary;

//   request(url, {encoding: 'utf8'}).on('data', (data) => {
//     try {
//       dictionary+=data;
//     }
//     catch (error) {
//       console.error(error);
//     }
//   })

//   request(url, {encoding: 'utf8'}).on('complete', (data) => {
//     try {
//       console.log(data);
//     }
//     catch (error) {
//       console.error(error);
//       callback();
//     }
//     callback();
//   })
// }

// request(url, function (err, res, body) {
//     // Do funky stuff with body
//     console.log(body);
// });

app.get('/translate/:from/:to/:queryString', function (req, res) {
    var {
        from,
        to,
        queryString
    } = req.params;
    var api_url = 'https://openapi.naver.com/v1/language/translate';
    var options = {
        url: api_url,
        form: {
            'source': from,
            'target': to,
            'text': queryString
        },
        headers: {
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret
        }
    };
    request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {
                'Content-Type': 'text/json;charset=utf-8'
            });
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

function getEnv() {
    const env = process.env.NODE_ENV || 'dev';
    return env.toLowerCase().startsWith('dev') ? 'dev' : 'prod';
}

app.get('/api/v1.1/autocomplete/:query', async (req, res) => {
    var query = req.params.query;
    console.log(`autocomplete query: ${query}`);

    var results;
    try {
        let start = Date.now();
        results = await dictionary.search(query);
        if(results.length>0)
            console.log(results[0]);

        console.log(`search time: ${Date.now() - start}`);
        res.status(200);
        res.json(results);
    } catch (error) {
        console.warn(error);
        console.warn('error!!!')
        console.warn(JSON.stringify(error))
        res.status(500);
        res.json({});
    }
    res.end();
})

app.get('/api/v1.0/autocomplete/elastic/en/:query', async (req, res) => {
    var query = req.params.query;
    console.log(`autocomplete query: ${query}`);
    const host = (getEnv() == 'prod') ? process.env.ELASTIC_URL : process.env.ELASTICSEARCH_URL;
    // var client = new elasticsearch.Client({
    //     host,
    //     // log: 'trace'
    //     apiVersion: '6.6',
    // });

    var results;

    try {


        if (is_hangul_char(query[0])) {
            // hangul query
            const { body, statusCode, warnings } = await client.search({
                index: 'kengdic',
                // type: 'logs',
                body: {
                    query: {
                        match: {
                            word: query
                        }
                    }
                }
            })


            if (statusCode != 200) {
                console.warn('error');
                console.warn(warnings)
            }
            // console.log(response.hits.hits);

            results = body.hits.hits.map((hit, idx) => {
                return {
                    id: idx,
                    Korean: hit._source.word,
                    English: hit._source.def
                }
            });

            console.log(results);

        } else {
            // english query
            const { body, statusCode, warnings } = await client.search({
                index: 'kengdic',
                // type: 'logs',
                body: {
                    suggest: {
                        defSuggest: {
                            prefix: query,
                            completion: {
                                field: 'def',
                            }
                        }
                    }
                }
            })

            if (statusCode != 200) {
                console.warn('error');
                console.warn(warnings)
            }

            results = body.suggest.defSuggest[0].options.map((option, id) => {
                return {
                    id,
                    English: option.text,
                    Korean: option._source.word
                };
            });

            console.log(results);

        }

        res.status(200);
        res.json(results);
        res.end();
    } catch (error) {
        console.warn(error);
        console.warn('error!!!')
        console.warn(JSON.stringify(error.meta.body.error))
        res.status(500);
        res.json({});
        res.end();
    }

})

app.get(`/api/v1.0/autocomplete/naver/en/:query`, (req, res) => {
    var query = req.params.query;
    console.log(`autocomplete query: ${query}`);
    var api_url = encodeURI(`https://ac.dict.naver.com/enendict/ac?_callback=window.__jindo2_callback.$2414&q=${query}&q_enc=utf-8&st=11001&r_format=json&r_enc=utf-8&r_lt=11001&r_unicode=0&r_escape=1`);

    var options = {
        url: api_url,
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = body;
            const datastart = data.indexOf('{');
            const dataend = data.lastIndexOf('}');
            const parsed = JSON.parse(data.substr(datastart, dataend - datastart + 1));
            const isEnglishQuery = /^[a-zA-Z0-9()]+$/.test(query);

            // parsed word map
            const result = [];
            let i = 0;
            const arr = [];
            for (const list of parsed.items) {
                arr.push(...list);
            }
            for (const pair of arr) {
                if (isEnglishQuery) {
                    result.push({
                        id: i,
                        English: pair[0][0],
                        Korean: pair[1][0],
                    })
                } else {
                    result.push({
                        id: i,
                        English: pair[1][0],
                        Korean: pair[0][0],
                    })
                }
                i += 1;
            }

            console.log('result:');
            console.log(result);
            // console.log(result);

            res.json(result);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
            console.log(response.body);
        }
    });
})
app.listen(3001, function () {
    console.log('https://127.0.0.1:3001/translate app listening on port 3001!');
});