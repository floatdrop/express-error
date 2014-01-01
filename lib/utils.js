'use strict';

var tabToSpaces = function tabToSpaces(s, spaceCount) {
    spaceCount = spaceCount || 4;
    var chars = s.split('');
    var out = '';

    chars.forEach(function (char) {
        if (char === '\t') {
            var spaces = spaceCount - (out.length % spaceCount);
            for (var k = 0; k < spaces; k++) {
                out += ' ';
            }
        } else {
            out += char;
        }
    });
};

exports.tabToSpaces = tabToSpaces;

exports.padLeft = function (s, length, char) {
    char = char || ' ';
    var fill = length - s.length;
    var pad = '';
    if (fill > 0) {
        for (var i = 0; i < fill; i++) {
            pad += char;
        }
        pad += s;
    }

    return pad;
};

// Align code to left on first non-whitespace
exports.alignLeft = function (lines) {
    var left = Number.MAX_VALUE;
    lines = lines.map(function (line) {
        line = tabToSpaces(line.code);

        for (var i = 0; i < line.code.length; i++) {
            if (line.code[i] !== ' ') {
                left = Math.min(left, i);
            }
        }

        return line;
    });

    return lines.map(function (line) {
        line.code = line.code.slice(left);
    });
};