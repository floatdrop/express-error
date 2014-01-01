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
          11: app.get('/error', function (req, res) {
          12:     // SECRETLINE
          13:     require('./foobar');
          14: });
          15:
          16: app.use(expressError({contextLinesCount: 3}));
    at callbacks (./node_modules/express/lib/router/index.js:161:37)
         159:           fn(err, req, res, callbacks);
         160:         } else if (fn) {
         161:           if (fn.length < 4) return fn(req, res, callbacks);
         162:           callbacks();
         163:         } else {
         164:           nextRoute(err);
    at param (./node_modules/express/lib/router/index.js:135:11)
         133:           fn(err, req, res, callbacks);
         134:         } else if (fn) {
         135:           if (fn.length < 4) return fn(req, res, callbacks);
         136:           callbacks();
         137:         } else {
         138:           nextRoute(err);
    at pass (./node_modules/express/lib/router/index.js:142:5)
         140:           fn(err, req, res, callbacks);
         141:         } else if (fn) {
         142:           if (fn.length < 4) return fn(req, res, callbacks);
         143:           callbacks();
         144:         } else {
         145:           nextRoute(err);
    at Router._dispatch (./node_modules/express/lib/router/index.js:170:5)
         168:           fn(err, req, res, callbacks);
         169:         } else if (fn) {
         170:           if (fn.length < 4) return fn(req, res, callbacks);
         171:           callbacks();
         172:         } else {
         173:           nextRoute(err);
    at Object.router (./node_modules/express/lib/router/index.js:33:10)
          31:           fn(err, req, res, callbacks);
          32:         } else if (fn) {
          33:           if (fn.length < 4) return fn(req, res, callbacks);
          34:           callbacks();
          35:         } else {
          36:           nextRoute(err);
    at next (./node_modules/express/node_modules/connect/lib/proto.js:190:15)
         188:         }
         189:       } else if (arity < 4) {
         190:         layer.handle(req, res, next);
         191:       } else {
         192:         next();
         193:       }
    at Object.expressInit [as handle] (./node_modules/express/lib/middleware.js:31:5)
          29:     res.locals = res.locals || utils.locals(res);
          30:
          31:     next();
          32:   }
          33: };
          34:
    at next (./node_modules/express/node_modules/connect/lib/proto.js:190:15)
         188:         }
         189:       } else if (arity < 4) {
         190:         layer.handle(req, res, next);
         191:       } else {
         192:         next();
         193:       }
    at Object.query [as handle] (./node_modules/express/node_modules/connect/lib/middleware/query.js:44:5)
          42:     }
          43:
          44:     next();
          45:   };
          46: };
          47:
    at next (./node_modules/express/node_modules/connect/lib/proto.js:190:15)
         188:         }
         189:       } else if (arity < 4) {
         190:         layer.handle(req, res, next);
         191:       } else {
         192:         next();
         193:       }
    at Function.app.handle (./node_modules/express/node_modules/connect/lib/proto.js:198:3)
         196:         }
         197:       } else if (arity < 4) {
         198:         layer.handle(req, res, next);
         199:       } else {
         200:         next();
         201:       }
    at Server.app (./node_modules/express/node_modules/connect/lib/connect.js:65:37)
          63:
          64: function createServer() {
          65:   function app(req, res, next){ app.handle(req, res, next); }
          66:   utils.merge(app, proto);
          67:   utils.merge(app, EventEmitter.prototype);
          68:   app.route = '/';
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


