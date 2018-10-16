const CryptoJS = require('crypto-js');
const request = require('request');
const Promise = require('promise');
const config = require('../config/config');

var auth_uri = 'https://sandbox-authservice.priaid.ch/login';

//function to get hashed string 
const genHashString = () => {
		const hash = CryptoJS.HmacMD5(auth_uri,config.SECRET_KEY);
		const hashString = hash.toString(CryptoJS.enc.Base64);
		return hashString;
}

const getToken = () => {
	return new Promise((resolve, reject) => {
		let hashString = genHashString();
		var options = {
			method:'POST',
			url:auth_uri,
			headers:{
				'Authorization':`Bearer ${config.API_KEY}:${hashString}`
			}
		}

		//send request to server to get token
		request(options,(error,response,body)=>{
			if(error)
				reject(error);
			else{
				var newBody = JSON.parse(response.body);
				resolve(newBody.Token);
			}
		});
	});
}	

module.exports = {
	getToken
}