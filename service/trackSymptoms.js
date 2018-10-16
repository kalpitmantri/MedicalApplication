const request = require('request');
const config = require('../config/config.js');

//call infermedica api to parse the given text and fetch symptoms
const trackSymptom = (searchText,callback)=>{
	const options = {
		method:'post',
		url: 'https://api.infermedica.com/v2/parse',
  		headers:{
     		'content-type': 'application/json',
     		'app-key': config.APP_KEY,
     		'app-id': config.APP_ID
   		},
   		body:{
   			text:searchText
   		},
   		json:true
	}
	request(options,(err,res,body)=>{
		if(err){
			return callback(err);
		}
		return callback(body);
	});
}

module.exports = {
	callApi : trackSymptom
};