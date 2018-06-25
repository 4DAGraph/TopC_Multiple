var request = require('request');
request.get('https://blockexplorer.com/api/addr/3D2oetdNuZUqQHPJmcMDDHYoqkyNVsFk9r',function(error, response, body){
	console.log(body);
})

