crypto = require('crypto');
function encrypt_token(data, skey) {
    var md5 = crypto.createHash("md5");
    md5.update(skey);
    var key = md5.digest('hex');
    var iv = key.substr(0, 16);
    console.log(key);
    console.log(iv);
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    var restr = cipher.update(data, 'binary', 'base64');
    restr += cipher.final('base64');
    return restr;
}
function decrypt_token(data, skey) {
    var md5 = crypto.createHash("md5");
    md5.update(skey);
    var key = md5.digest('hex');
    var iv = key.substr(0, 16);
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    var restr = decipher.update(data, 'base64', 'binary');
    restr += decipher.final('binary');
    return restr;
}
var enstr = encrypt_token('ffea96f4c8910006bdb25eb908b00b4f647b4e3f9ee9571c1f89121e9180f585', '11111111111111111111111111111111');
console.log('NodeJS encrypt: ', enstr);
console.log('NodeJS decrypt: ', decrypt_token(enstr, '11111111111111111111111111111111'));
