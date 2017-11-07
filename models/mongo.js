var mongodb = require('mongodb');

var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db('mydb', mongodbServer);
console.log(db)
db.open(function() {
    db.collection('contact', function(err, collection) {
        collection.insert({
            name: 'Fred Chien'
        }, function(err, data) {
            if (data) {
                console.log('Successfully Insert');
            } else {
                console.log('Failed to Insert');
            }
        });
    });
db.close();
});
