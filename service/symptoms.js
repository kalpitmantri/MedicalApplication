const request = require('request');
const config = require('../config/config.js');
const tokenGenerator = require('./tokenGenerator');

Symptoms_URL = 'https://sandbox-healthservice.priaid.ch/symptoms?';

//Call Apimedic's API to fetch Symptoms
const callSymptomAPI = (callback) => {

    //Generate Token
    tokenGenerator.getToken().then((hashToken)=>{
        const params = {
            token:hashToken,
            language:'en-gb',
            format:'json'
        }
        //send request to apimedic's api
        request({url:Symptoms_URL,qs:params,json:true}, (err, res, body) => {
            if (err) { 
                return callback(err);
            } 
            return callback(body);
        });
    }).catch((err)=>{
        return callback(err);
    });
}

module.exports = {
	callApi : callSymptomAPI,
};