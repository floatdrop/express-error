'use strict';

var FS = require('fs');
var Utils = require('./utils');
var HOME = process.env.HOME || process.env.USERPROFILE;
var CWD = process.cwd();
var path = require('path');

function injectSourceLines(lines, contextLinesCount) {
    contextLinesCount = contextLinesCount || 3;
    var newLines = [];
    var cache = {};

    lines.forEach(function (line) {
        var lineObj = {frame: line, code: []};
        newLines.push(lineObj);

        var re = /(.*)\((.*):(\d+):(\d+)\)/
        var matches = re.exec(line);
        if (matches) {
            var codeFile = matches[2];

            if (codeFile.indexOf(HOME) === 0) {
                codeFile = codeFile.replace('~', HOME);
            }

            codeFile = path.resolve(codeFile);
            var errorLine = parseInt(matches[3]);

            lineObj.frame = matches[1] + '(' + codeFile + ':' + matches[3] + ':' + matches[4] + ')';

            try {
                var textLines = cache[codeFile];
                if (!textLines) {
                    var text = FS.readFileSync(codeFile, 'utf8'); // TODO: This line is shit
                    textLines = cache[codeFile] = text.split('\n').slice(errorLine - contextLinesCount, errorLine + contextLinesCount);
                }
                textLines.forEach(function (line, i) {
                    lineObj.code.push({ lineNum: errorLine + i + 1 - contextLinesCount, code: line });
                });
                Utils.alignLeft(lineObj.code);

            }
            catch (err) {
                // Intentionally do nothing
            }
        }
    });
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
    var lines = stack.split('\n').map(function (line) {
        if (line.indexOf(CWD) > 0) {
            return line.replace(CWD, '.');
        } else if (line.indexOf(HOME) > 0) {
            return line.replace(HOME, '~');
        }
        return line;
    });

    return injectSourceLines(
        lines,
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
                result += Utils.padLeft(line.lineNum.toString(), 4);
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

        if (options.sendHtml) {
            var jade = require('jade');
            var stackLines = err.stack.split('\n');
            stackLines.shift();
            jade.renderFile(path.join(__dirname, 'view/error.jade'), {
                title: options.title || 'Error',
                statusCode: res.statusCode || 500,
                error: err.message || err.stack.split('\n')[0],
                stack: stackLines
            }, function (jerr, html) {
                console.log(jerr);
                console.log(html);
                if (jerr) { next(err); } else { res.send(html); }
            });
        } else if (next) {
            next(err);
        }
    };
};