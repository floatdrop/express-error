# express-error-with-sources [![Build Status](https://travis-ci.org/floatdrop/express-error-with-sources.png?branch=master)](https://travis-ci.org/floatdrop/express-error-with-sources)

Enhanced express 3 error handler which inserts source code within error stack for
JavaScript.

__Deprecated: use [express-stackman](https://github.com/floatdrop/express-stackman) instead__

## Usage

Install module:

`npm i express-error-with-sources --save`

Insert middleware into your express app:

```javascript

// Be sure to add it after `.get`, `.post` and ohters routers - otherwise error will be not intercepted

app.configure('development', function() {
  app.use(require('express-error-with-sources')({contextSize: 3}));
});
```

## Options

 * `contextSize` - Number of lines to insert before and after the error line (default: `3`)
 * `title` - Title of html error page (default: `Error`)
 * `depth` - How deep `util.inspect` should go (default: `5`)

## Html output 

You can see instant example by doing this:

```bash
git clone https://github.com/floatdrop/node-parsetrace && cd $_
npm i && node example
```

Open [`http://localhost:3000`](http://localhost:3000) for exception example or [`http://localhost:3000/object`](http://localhost:3000/object) for object example.

On [`http://localhost:3000`](http://localhost:3000) you should see something like that:

![screenshot](https://github.com/floatdrop/express-error-with-sources/raw/master/img/screenshot.png)

(If you not - write an issue, we will figure it out)

## Text output

For text-output use [parsetrace](https://github.com/floatdrop/node-parsetrace).

## License

The MIT License (MIT) Copyright (c) 2012 Barc, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


