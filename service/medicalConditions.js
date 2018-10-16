const request = require('request');
const config = require('../config/config.js');
const querystring = require('querystring');
const tokenGenerator = require('./tokenGenerator');

const Diagnosis_URL = 'https://sandbox-healthservice.priaid.ch/diagnosis?';

//Function to get the symptom ID, given SymptomName and list of all symptoms
function getID(symptomName,symptomList){
	
	for(let i=0;i<symptomList.length;i++){
	    if(symptomList[i].Name.toLowerCase() === symptomName){
        	return symptomList[i].ID;
      	}
    }
    return -1;
}

//Call Apimedic's API to fetch medical conditions of a given symptom
const callMedicalConditionAPI = (symptomList,reqQuery,callback) =>{
	const symptomName = reqQuery.symptomName.toLowerCase();
	const symptomId = getID(symptomName,symptomList);
	if(symptomId == -1){
		return callback({err:"Symptom not Found in Apimedc's API"});
	}

	//Generate Token
	tokenGenerator.getToken().then((hashToken)=>{
		const params = {
			token:hashToken,
			language:'en-gb',
			format:'json',
			gender:reqQuery.gender,
			year_of_birth:reqQuery.year_of_birth,
		}
		
		var xurl = Diagnosis_URL + querystring.stringify(params);
		xurl = xurl + '&symptoms=[' + symptomId + ']';

		//send request to apimedic api
		request({url:xurl,json:true},(err,res,body)=>{
			if(err){
				return callback(err);
			}
			return callback(body);
		});
	}).catch((err)=>{
		return callback(err);
	});
}

module.exports = {
	callApi : callMedicalConditionAPI
};