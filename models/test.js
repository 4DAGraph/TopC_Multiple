var crypto = require('crypto');
const util = require('util');
var encrypt = function (key, iv, data) {
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    var crypted = cipher.update(data, 'utf8', 'binary');
    crypted += cipher.final('binary');
    crypted = new Buffer(crypted, 'binary').toString('base64');
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
    crypted = new Buffer(crypted, 'base64').toString('binary');
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    var decoded = decipher.update(crypted, 'binary', 'utf8');
    decoded += decipher.final('utf8');
    return decoded;
};

 
//var key = 'gibofflinewallet';
//console.log('加密的key:', key.toString('hex'));
//var iv = 'walletofflinegib';
//console.log('加密的iv:', iv);
        var aeskey = "gibofflinewallet"
        var iv = "walletofflinegib"
        var md5 = crypto.createHash("md5");
        md5.update(aeskey);
        var key = md5.digest('hex');
		console.log("md5key:"+key)
var data = decrypt(key, iv,"ykBi+yBvLK/1FAn+xbQtzkps34Gf0cc+clMUFmjsFeZQtBtTmq0AN+IxZ1QuH1d4HDDJCUF16x3rEngc+PQtis1WeKUVHWJq0n073/Uqssw=");
console.log("需要加密的数据:", data);
var crypted = encrypt(key, iv, "97ddae0f3a25b92268175400149d65d6887b9cefaf28ea2c078e05cdc15a3c0a");
console.log("数据加密后:", crypted);
var dec = decrypt(key, iv, "EelO+EgaHuMu1f3Q5dL6NQseham2BkkAFeMd6g9BoPFwVkl+7zfRgmxy5elSPMpoN5+A2J+fNVRalc++S9CHc6v17Vp0whdAgrdjFKvVLncz+pE9/4Euv674lFYRbRyI+zTJ439TTn07lTez4wJaIIho87BBKpqOOLn2WcGVPll9B51vfYgSe2vc2pM5Rx0W6jCx+3uAdJ/DkAB5aqlW9jM9OsMJegk7golJhwDx6QSaoWKr1cDVWISEDtmTBK6es+WkUinq53rO64ZPRNwuA1BsmHPrjCJhXqfhkYkn8JQvujC9/L+NZNj3xRSz0TohcRAKtUNO4nKAj6X8Ny99OQT7yeh22UFVyLdltVXSi+8xT3h7f7gi0G+gj0Hbzd+P0Tz5xwwLMMDqtXFAdf4duEfX/ur4+ePNganlO/vUbtr/DChojOt8TfYS6PILGzeCm+BY4ShorUfMmgT7D5C7GWjCbrjjllu9Zhzv4gfr9h+DCTM5uepoQxWaz7mA0O4Q/3h/NJeniTrA+fsHEH8wXycXnL1mZ7kV6kLYlDeZ7/j402v/Zg9I/kG1bU8NKgeEP0y98ZT59WAbIXRDrFBVeAefIWoKgCSt5QYKf1yCeUqmgeuVawm/QJzPoPLFRN7etskKxR5IoI7xQmQbdabD1Vcy++bLmRCFmC1R9KB39TAjjW1xQFVDczdmXygqjlcSieyPGFjtspGGfN9VPI4NwC1obSHYO6D6t5IePwVbO3NZHsDPemF5/aPKgRvs0gbIhcmcjD4mySME3yC76uQv8mAq89UfJsPWQh9h4e8kII6MdDQDlIIBu/oiKFCQi3M9KY+HxO8ms4upJuzS1QSaCItOZms/AF2IyXBrlR1ee7VwHzQn0QWJx4PkX40Rt34SqkoPaFnC+VdRyXl+lYKBzrBz5Vef4jthTRfPpRYpo1TRT4aPRFs0V66Z5wBx/HFTIMbw+tQmqXCDl+huT5pA9ZaYtbXwrtpsG+HaBDYJdHp4lbUuy81maJ0wBH/Z09bWtEVpsEtH2yiNCZbiPFsgpGKKCbMqLAKuyGqbFBDTFU/Rnl2V0RCBvF24zDSVGtyCtXPCaJi6fJagWk8C30ih7BEJJ7BuUXHHn/SQrqS8XB8=");//crypted);
console.log("数据解密后:", dec);
