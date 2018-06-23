<img src="http://bitcore.io/css/images/module-message.png" alt="litecore message" height="35">
# Litecoin Message Verification and Signing for Litecore


[![NPM Package](https://img.shields.io/npm/v/litecore-message.svg?style=flat-square)](https://www.npmjs.org/package/litecore-message)
[![Build Status](https://img.shields.io/travis/litecoin-project/litecore-message.svg?branch=master&style=flat-square)](https://travis-ci.org/litecoin-project/litecore-message)
[![Coverage Status](https://img.shields.io/coveralls/litecoin-project/litecore-message.svg?style=flat-square)](https://coveralls.io/r/litecoin-project/litecore-message?branch=master)

litecore-message adds support for verifying and signing litecoin messages in [Node.js](http://nodejs.org/) and web browsers.

See [the main litecore repo](https://github.com/litecoin-project/litecore) for more information.

## Getting Started

```sh
npm install litecore-message
```

```sh
bower install litecore-message
```

To sign a message:

```javascript
var litecore = require('litecore-lib');
var Message = require('litecore-message');

var privateKey = litecore.PrivateKey.fromWIF('cPBn5A4ikZvBTQ8D7NnvHZYCAxzDZ5Z2TSGW2LkyPiLxqYaJPBW4');
var signature = Message('hello, world').sign(privateKey);
```

To verify a message:

```javascript
var address = 'n1ZCYg9YXtB5XCZazLxSmPDa8iwJRZHhGx';
var signature = 'H9XORZInM3B3a8BNS65kwgmbnqEuq73rjAQ5VKyVzTrzPOdHdHOY2lfoph5auvMgLSr7bh+nEQSG/f2kv9TnsbY=';
var verified = Message('hello, world').verify(address, signature);
```

## Contributing

See [CONTRIBUTING.md](https://github.com/litecoin-project/litecore/blob/master/CONTRIBUTING.md) on the main litecore repo for information about how to contribute.

## License

Code released under [the MIT license](https://github.com/litecoin-project/litecore/blob/master/LICENSE).

Copyright 2013-2015 BitPay, Inc. Bitcore is a trademark maintained by BitPay, Inc.
Copyright 2016 The Litecoin Core Developers

