# express-error-with-sources [![Build Status](https://travis-ci.org/floatdrop/express-error-with-sources.png?branch=master)](https://travis-ci.org/floatdrop/express-error-with-sources)

Enhanced express 3 error handler which inserts source code within error stack for
JavaScript.

## Usage

```javascript
app.configure('development', function() {
  app.use(require('express-error-with-sources')({contextLinesCount: 3}));
});
```

## Options

 * `contextLinesCount` - Number of lines to insert before and after the error line (default: `3`)
 * `sendHtml` - Instead passing by modified error, send user nice html with it (default: `false`)
 * `title` - Title of html error page (default: `Error`)

## Html output 

![screenshot](https://github.com/floatdrop/express-error-with-sources/raw/master/img/screenshot.png)

## Text output

```
Error: Cannot find module '/Users/floatdrop/jiggle/static/desktop.bundles/index/index.priv.ru.js'
    at Function.Module._resolveFilename (module.js:338:15)
    at Function.require.resolve (module.js:384:19)
    at BemView.render (/Users/floatdrop/jiggle/server/lib/bemView.js:73:42)
          71: try {
          72:     if (environment === 'development') {
          73:         delete require.cache[require.resolve(privFile)];
          74:         delete require.cache[require.resolve(bemhtmlFile)];
          75:     }
          76:
    at ServerResponse.app.response.render (/Users/floatdrop/jiggle/server/middleware/express-bemView.js:107:17)
         105:         };
         106:
         107:         bemView.render(name, options, fn);
         108:     };
         109: };
         110:
```

## License

The MIT License (MIT) Copyright (c) 2012 Barc, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


