'use strict';

var express = require('express');
var app = express();
var expressError = require('../..');

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/error', function (req, res) {
    // SECRETLINE
    require('./foobar');
});

app.use(expressError({contextLinesCount: 3}));

app.use(function (err, req, res, next) {
    res.statusCode = 500;
    res.end(err.stack);
});

module.exports = app;