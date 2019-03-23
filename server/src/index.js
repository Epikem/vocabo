var request = require('request');
var express = require('express');
var app = express();
var elasticsearch = require('elasticsearch');

require('dotenv').config();
var client_id = process.env.NAVER_ID;
var client_secret = process.env.NAVER_SECRET;

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

function is_hangul_char(ch) {
    c = ch.charCodeAt(0);
    if (0x1100 <= c && c <= 0x11FF) return true;
    if (0x3130 <= c && c <= 0x318F) return true;
    if (0xAC00 <= c && c <= 0xD7A3) return true;
    return false;
}

app.get('/v1.0/autocomplete/elastic/en/:query', async (req, res) => {
    var query = req.params.query;
    console.log(`autocomplete query: ${query}`);

    var client = new elasticsearch.Client({
        host: process.env.ELASTICSEARCH_URL,
        // log: 'trace'
        apiVersion: '6.6',
    });

    var results;

    if (is_hangul_char(query[0])) {
        // hangul query
        const response = await client.search({
            index: 'kengdic',
            type: 'logs',
            body: {
                query: {
                    match: {
                        word: query
                    }
                }
            }
        })

        // console.log(response.hits.hits);

        results = response.hits.hits.map((hit, idx) => {
            return {
                id: idx,
                Korean: hit._source.word,
                English: hit._source.def
            }
        });

        console.log(results);

    } else {
        // english query
        const response = await client.search({
            index: 'kengdic',
            type: 'logs',
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

        results = response.suggest.defSuggest[0].options.map((option, id) => {
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

})

app.get(`/v1.0/autocomplete/naver/en/:query`, (req, res) => {
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
    console.log('http://127.0.0.1:3001/translate app listening on port 3001!');
});