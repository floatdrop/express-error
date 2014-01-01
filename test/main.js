/* global describe, it, require, beforeEach */
'use strict';
var request = require('supertest');
var expressError = require('..');

describe('main tests', function () {
    beforeEach(function () {
        delete require.cache[require.resolve('./app')];
        this.app = require('./app');
    });

    it('respond with OK', function (done) {
        this.app.use(expressError({contextLinesCount: 3}));
        request(require('./app'))
            .get('/')
            .expect(200, done);
    });

    it('respond with ERROR', function (done) {
        this.app.use(expressError({contextLinesCount: 3}));
        this.app.use(function (err, req, res, next) {
            res.statusCode = 500;
            res.end(err.stack);
        });
        request(this.app)
            .get('/error')
            .expect(/SECRETLINE/g, done);
    });

    it('generates html', function (done) {
        this.app.use(expressError({contextLinesCount: 3, sendHtml: true}));
        this.app.use(function (err, req, res, next) {
            res.statusCode = 500;
            res.end(err.stack);
        });
        request(this.app)
            .get('/error')
            .expect(/<html/g)
            .expect(/SECRETLINE/, done);
    });
});
