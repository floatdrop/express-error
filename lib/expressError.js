'use strict';

var parsetrace = require('parsetrace'),
    jade = require('jade'),
    path = require('path');

module.exports = function (options) {
    options = options || {};
    options.sources = options.sources || true;

    return function (err, req, res, next) {
        var trace = parsetrace(err, options).object();

        jade.renderFile(path.join(__dirname, 'view/error.jade'), {
            title: options.title || 'Error',
            statusCode: res.statusCode > 299 ? res.statusCode : 500,
            trace: trace,
            pretty: true
        }, function (err, html) {
            if (err) { next(err); } else { res.send(html); }
        });
    };
};