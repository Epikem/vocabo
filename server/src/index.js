var request = require('request');
var express = require('express');
var app = express();

require('dotenv').config();
var client_id = process.env.NAVER_ID;
var client_secret = process.env.NAVER_SECRET;

app.get('/translate/:from/:to/:queryString', function (req, res) {
    var {from, to, queryString} = req.params;
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

app.get(`/search/autocomplete/en/:query`, (req, res)=>{
    var query = req.params.query;
    var api_url = encodeURI(`https://ac.dict.naver.com/enendict/ac?_callback=window.__jindo2_callback.$2414&q=${query}&q_enc=utf-8&st=11001&r_format=json&r_enc=utf-8&r_lt=11001&r_unicode=0&r_escape=1`);
    
    var options = {
        url: api_url,
    };
    request.get(options, function (error, response, body) {
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
})
app.listen(3001, function () {
    console.log('http://127.0.0.1:3001/translate app listening on port 3001!');
});