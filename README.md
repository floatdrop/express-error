# express-error-with-sources

[![Build Status](https://travis-ci.org/floatdrop/express-error-with-sources.png?branch=master)](https://travis-ci.org/floatdrop/express-error-with-sources)

Enhanced express 3 error handler which inserts source code within error stack for
JavaScript.

## Usage

```javascript
app.configure('development', function() {
  app.use(require('express-error-with-sources')({contextLinesCount: 3}));
});
```

## Options

```javascript
{
    contextLinesCount: Integer         // Number of lines to insert before and after the error line.
}
```

## Example output

```
Error: Cannot find module './foobar'
    at Function.Module._resolveFilename (module.js:338:15)
    at Function.Module._load (module.js:280:25)
    at Module.require (module.js:364:17)
    at require (module.js:380:17)
    at app.use.expressError.contextLinesCount (./test/app/index.js:13:5)
           1: app.get('/error', function (req, res) {
           2:     // SECRETLINE
           3:     require('./foobar');
           4: });
           5:
           6: app.use(expressError({contextLinesCount: 3}));
    at callbacks (./node_modules/express/lib/router/index.js:161:37)
           1:           fn(err, req, res, callbacks);
           2:         } else if (fn) {
           3:           if (fn.length < 4) return fn(req, res, callbacks);
           4:           callbacks();
           5:         } else {
           6:           nextRoute(err);
    at param (./node_modules/express/lib/router/index.js:135:11)
           1:           fn(err, req, res, callbacks);
           2:         } else if (fn) {
           3:           if (fn.length < 4) return fn(req, res, callbacks);
           4:           callbacks();
           5:         } else {
           6:           nextRoute(err);
    at pass (./node_modules/express/lib/router/index.js:142:5)
           1:           fn(err, req, res, callbacks);
           2:         } else if (fn) {
           3:           if (fn.length < 4) return fn(req, res, callbacks);
           4:           callbacks();
           5:         } else {
           6:           nextRoute(err);
    at Router._dispatch (./node_modules/express/lib/router/index.js:170:5)
           1:           fn(err, req, res, callbacks);
           2:         } else if (fn) {
           3:           if (fn.length < 4) return fn(req, res, callbacks);
           4:           callbacks();
           5:         } else {
           6:           nextRoute(err);
    at Object.router (./node_modules/express/lib/router/index.js:33:10)
           1:           fn(err, req, res, callbacks);
           2:         } else if (fn) {
           3:           if (fn.length < 4) return fn(req, res, callbacks);
           4:           callbacks();
           5:         } else {
           6:           nextRoute(err);
    at next (./node_modules/express/node_modules/connect/lib/proto.js:190:15)
           1:         }
           2:       } else if (arity < 4) {
           3:         layer.handle(req, res, next);
           4:       } else {
           5:         next();
           6:       }
    at Object.expressInit [as handle] (./node_modules/express/lib/middleware.js:31:5)
           1:     res.locals = res.locals || utils.locals(res);
           2:
           3:     next();
           4:   }
           5: };
           6:
    at next (./node_modules/express/node_modules/connect/lib/proto.js:190:15)
           1:         }
           2:       } else if (arity < 4) {
           3:         layer.handle(req, res, next);
           4:       } else {
           5:         next();
           6:       }
    at Object.query [as handle] (./node_modules/express/node_modules/connect/lib/middleware/query.js:44:5)
           1:     }
           2:
           3:     next();
           4:   };
           5: };
           6:
    at next (./node_modules/express/node_modules/connect/lib/proto.js:190:15)
           1:         }
           2:       } else if (arity < 4) {
           3:         layer.handle(req, res, next);
           4:       } else {
           5:         next();
           6:       }
    at Function.app.handle (./node_modules/express/node_modules/connect/lib/proto.js:198:3)
           1:         }
           2:       } else if (arity < 4) {
           3:         layer.handle(req, res, next);
           4:       } else {
           5:         next();
           6:       }
    at Server.app (./node_modules/express/node_modules/connect/lib/connect.js:65:37)
           1:
           2: function createServer() {
           3:   function app(req, res, next){ app.handle(req, res, next); }
           4:   utils.merge(app, proto);
           5:   utils.merge(app, EventEmitter.prototype);
           6:   app.route = '/';
    at Server.EventEmitter.emit (events.js:98:17)
    at HTTPParser.parser.onIncoming (http.js:2108:12)
    at HTTPParser.parserOnHeadersComplete [as onHeadersComplete] (http.js:121:23)
    at Socket.socket.ondata (http.js:1966:22)
    at TCP.onread (net.js:525:27)
```

## License

The MIT License (MIT) Copyright (c) 2012 Barc, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


