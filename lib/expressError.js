'use strict';

var parsetrace = require('parsetrace'),
    jade = require('jade'),
    path = require('path');

module.exports = function (options) {
    options = options || {};
    options.sources = options.sources || true;
    options.depth = options.depth || 5;

    return function (err, req, res, next) {

        function sendHtml(err, html) {
            if (err) { next(err); } else { res.send(html); }
        }

        var statusCode = err.status || res.statusCode;

        if (err.stack) {
            var trace = parsetrace(err, options).object();
            jade.renderFile(path.join(__dirname, 'view/error.jade'), {
                title: options.title || 'Error',
                statusCode: statusCode > 299 ? statusCode : 500,
                trace: trace,
                pretty: true
            }, sendHtml);
        } else {
            jade.renderFile(path.join(__dirname, 'view/object.jade'), {
                title: options.title || 'Error',
                statusCode: statusCode > 299 ? statusCode : 500,
                object: err,
                options: options,
                util: require('util'),
                pretty: true
            }, sendHtml);
        }

    };
};
