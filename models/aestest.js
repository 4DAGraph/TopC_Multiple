var crypto = require('crypto');
 
/**
 * 加密方法
 * @param key 加密key
 * @param iv       向量
 * @param data     需要加密的数据
 * @returns string
 */
var encrypt = function (key, iv, data) {
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    var crypted = cipher.update(data, 'utf8', 'hex');
	console.log(crypted)    
crypted += cipher.final('hex');
    // crypted = new Buffer(crypted, 'binary').toString('base64');
    return crypted;
};
 
/**
 * 解密方法
 * @param key      解密的key
 * @param iv       向量
 * @param crypted  密文
 * @returns string
 */
var decrypt = function (key, iv, crypted) {
    //crypted = new Buffer(crypted, 'base64').toString('binary');
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    var decoded = decipher.update(crypted, 'hex', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
};

var key = "11111111111111111111111111111111";
console.log('加密的key:', key.toString('hex'));
var iv = new Buffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00,0x00,0x00,0x00, 0x00, 0x00, 0x00, 0x00, 0x00,0x00,0x00]);
//var iv = Buffer.from('0000000000000000', 'utf8' );
//iv = iv.toString("binary")
console.log('iv:', iv);
var data = "ffea96f4c8910006bdb25eb908b00b4f647b4e3f9ee9571c1f89121e9180f585";
//var data = Buffer.from(data,"utf8")
console.log("需要加密的数据:", data);
var crypted = encrypt(key, iv, data);
console.log("数据加密后:", crypted);
var dec = decrypt(key, iv, crypted);
console.log("数据解密后:", dec);
