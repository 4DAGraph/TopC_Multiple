module.exports = {

	toHex: function toHex(str){ // .toString(16) only works up to 2^53
   	 var dec = str.toString().split(''), sum = [], hex = [], i, s
   	 while(dec.length){
       	 s = 1 * dec.shift()
       	 for(i = 0; s || i < sum.length; i++){
       	     s += (sum[i] || 0) * 10
       	     sum[i] = s % 16
       	     s = (s - sum[i]) / 16
       	 }
    	}
    	while(sum.length){
       	 hex.push(sum.pop().toString(16))
    	}
    	return hex.join('')
	}
}
