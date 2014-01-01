'use strict';

exports.index = function(req, res) {
    res.send('Hello World');
};

exports.error = function() {
    require('./foobar');
};