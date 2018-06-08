module.exports = {

	toHex: function toHex(str){ // .toString(16) only works up to 2^53
		function toFixed(x) {
			if (Math.abs(x) < 1.0) {
				var e = parseInt(x.toString().split('e-')[1]);
				if (e) {
					x *= Math.pow(10,e-1);
					x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
				}
			} else {
				var e = parseInt(x.toString().split('+')[1]);
				if (e > 20) {
					e -= 20;
					x /= Math.pow(10,e);
					x += (new Array(e+1)).join('0');
				}
			}
			return x;
		}
		console.log(str)
		str = toFixed(parseInt(str))
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
	},
	paddingLeft: function paddingLeft(str,lenght){
        	if(str.length >= lenght)
        	        return str;
        	        else
        	        return paddingLeft("0" +str,lenght);
	}
}
