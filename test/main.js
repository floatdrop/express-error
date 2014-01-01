/* global describe, it, require */
'use strict';
var request = require('supertest');
var assert = require('assert');

describe('GET /ping', function () {
    it('respond with OK', function (done) {
        request(require('./app'))
            .get('/')
            .expect(200, done);
    });

    it('respond with ERROR', function (done) {
        var app = require('./app');
        request(app)
            .get('/error')
            .expect(/SECRETLINE/g, done);
    });
});
