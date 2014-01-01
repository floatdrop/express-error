var express = require('express');
var app = express();
var routes = require('./routes');
var expressError = require('..');

app.configure('development', function() {
    app.use(expressError.express3({contextLinesCount: 3, handleUncaughtException: true}));
});

app.get('/', routes.index);
app.get('/error', routes.error);

module.exports = app;