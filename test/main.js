/* global describe, it, require */
'use strict';
var request = require('supertest');

describe('GET /ping', function() {
    it('respond with OK', function(done) {
        request(require('app'))
            .get('/')
            .expect(200, done);
    });

    it('respond with ERROR', function(done) {
        request(require('app'))
            .get('/error')
            .expect(500, done);
    });
});
