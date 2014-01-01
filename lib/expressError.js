'use strict';

var FS = require('fs');
var Path = require('path');
var Utils = require('./utils');
var HOME = process.env.HOME || process.env.USERPROFILE;
var CWD = process.cwd();

function injectSourceLines(lines, contextLinesCount) {
    var newLines = [];
    var cache = {};

    for (var i = 1; i < lines.length; i++) {
        var lineObj = {frame: lines[i], code: []};
        newLines.push(lineObj);

        var re = lines[i].indexOf('(') > 0 ? /\((.*):(\d+):(\d+)\)/ : /at (.*):(\d+):(\d+)/;
        var matches = re.exec(lines[i]);

        if (matches) {
            var codeFile = matches[1];

            if (codeFile.indexOf(HOME) === 0) {
                codeFile = codeFile.replace('~', HOME);
            }

            var linenum = parseInt(matches[2]);
            var ext = Path.extname(codeFile);

            var pushLine = function (text, suffix) {
                suffix = suffix || '';
                var textLines = text.split('\n');
                textLines.forEach(function (line, i) {
                    i += 1;
                    lineObj.code.push({ linenum: i, code: line, isErrorLine: i === linenum });
                });
                Utils.alignLeft(lineObj.code);
            };

            try {
                var text = cache[codeFile];
                if (!text) {
                    text = FS.readFileSync(codeFile, 'utf8'); // TODO: This line is shit
                    // TODO: crop to contextLinesCount
                    if (ext === '.js') {
                        cache[codeFile] = text;
                    }
                }
                pushLine(text);
            }
            catch (err) {
              // TODO: do something with this error; I think inline to result html
            }
        }
    }
    return newLines;
}

/*
Removes nodeunit specic line trace from stack and colors any
line from current test module.

@param {String} stack Error stack.
@param {Object} mod The test module.
@returns {String} Returns the modified stack trace.
*/
function betterStack(stack, contextLinesCount) {
    if (!stack) {
        return '';
    }

    return injectSourceLines(
        stack.split('\n').map(function (line) {
            if (line.indexOf(CWD) > 0) {
                return line.replace(CWD, '.');
            } else if (line.indexOf(HOME) > 0) {
                return line.replace(HOME, '~');
            }
        }),
        contextLinesCount
    );
}

function format(frames) {
    if (!Array.isArray(frames) || !frames.length) {
        return '';
    }

    return frames.map(function (frame) {
        var result = frame.frame;
        if (frame.code && frame.code.length) {
            frame.code.forEach(function (line) {
                result += '\n        ';
                result += Utils.padLeft(line.linenum.toString(), 4);
                result += ': ' + line.code;
            });
        }
        return result;

    }).join('\n');
}

/*
# Returns a function with signature compatible with express 3.
#
# @param {Object} options {enableUncaughtExceptions: "set to true to let this handle uncaught exceptions",
#                          contextLinesCount: "the number of lines to print before and after an error line"
#                         }
*/
module.exports = function (options) {
    options = options || {};
    var contextLinesCount = options.contextLinesCount || 0;

    return function (err, req, res, next) {
        if (err && err.stack) {
            err.stack = format(betterStack(err.stack, contextLinesCount));
        }
        next(err);
    };
};