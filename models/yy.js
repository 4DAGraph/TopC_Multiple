var address = require("./address.json")

for(var myKey in address) {
   console.log("key:"+myKey+", value:"+address[myKey]);
}
