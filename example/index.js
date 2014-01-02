'use strict';

var express = require('express');
var app = express();
var http = require('http');

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
});

app.get('/', function () {
    throw new Error('Bang! Bang!');
});

app.use(require('..')({contextSize: 3}));

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});