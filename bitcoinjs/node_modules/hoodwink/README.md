# hoodwink

[![build status](https://secure.travis-ci.org/dcousens/hoodwink.png)](http://travis-ci.org/dcousens/hoodwink)
[![Version](http://img.shields.io/npm/v/hoodwink.svg)](https://www.npmjs.org/package/hoodwink)

A dead simple mock/stub module for Javascript

**TODO**: `hoodwink/async`

## Examples

``` javascript
let tape = require('tape')
let hoodwink = require('hoodwink')

tape('foo returns 0, then 1', hoodwink((t) => {
	let stub = this.stub(function f () {
		if (f.calls === 0) return 0
		if (f.calls === 1) return 1
	}, 2)

	t.equal(stub(), 0)
	t.equal(stub(), 1)
	// stub(), will throw, and explode on `hoodwink` finishing
})
```

## License [ISC](LICENSE)
