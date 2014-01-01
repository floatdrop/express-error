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
            /*.end(function (err) {
                assert.ok(err, 'Error is not generated');
                assert.ok(err.stack, 'Error stack is lost');
                assert.ok(err.stack.indexOf('SECRETLINE') !== -1, 'Sources is not included in stack');
                done();
            });*/
    });
});
