const express = require('express');
const scraper = require('../service/scrape');
const symptoms = require('../service/symptoms');
const medicalConditions = require('../service/medicalConditions'); 
const trackSymptoms = require('../service/trackSymptoms');
const nearbyHospital = require('../service/nearbyHospital');
const tokenGenerator = require('../service/tokenGenerator');
const treatmentDb = require('../models/treatment');

const router = express.Router();

//Route to home page
router.get('/',(req,res)=>{
	res.json({
		message:"Home Page!"
	});
});

// (API 1) -  Route to get list of Symptoms from using Apimedic API
router.get('/getSymptoms',(req,res)=>{
	symptoms.callApi((data)=>{
		res.json(data);						//Got the list of Symptoms from Aimedic API
	});
});


// (API 2) - Route to get medical conditions for given symptom
router.get('/getMedicalConditions',(req,res)=>{
	symptoms.callApi((symptoms)=>{
		medicalConditions.callApi(symptoms,req.query,(data)=>{
			if(data.length == 0){
				res.send({err:"No Condition found in Apimedic's API"});
			}
			else
				res.json(data);
		})
	});
});


// (API 3) - Route to find treatment to given issues
router.post('/search',(req,res)=>{
	
	var issue = req.body.issue;
	issue = issue.toLowerCase();

	//Check if treatments to the given issue available in databse
	treatmentDb.find({'symptomName': issue},function(err,result){
		if(err)
			throw err;
		else{

			//NOT FOUND IN DATABASE
			if(result.length == 0){
				console.log("Not Fount in Db");
				scraper.scrape(issue,function(err,data){	   //Got various treatments by scraping the web!!
					if(data.length == 0){
						res.send({err:"No Data Found!!"});
					}
					else{
						var stringData = JSON.stringify(data);	  // Convert data to string to insert in database 

						var treatment = new treatmentDb({'symptomName': issue, 'medication':stringData});
						treatmentDb.create(treatment,function(err,treatment){	  //Adding new item to database
							if(err)
								throw err;
						});
						res.json(data)
					}  
				});
			}

			//FOUND IN DATABASE
			else{  											
				console.log("found in db");
				res.send(JSON.parse(result[0].medication));
			}
		}
	});

});


// (API 4) - Route to get nearby doctors, given current location 
router.get("/nearbyDoctors",(req,res)=>{
	const lat = req.query.latitude;
	const long = req.query.longitude;

	nearbyHospital.callApi(lat,long,(hospitals)=>{
		res.send(hospitals);
	});
});


// (API 5) - Route to track Symptom from given text and give medical conditions for that
router.post("/trackSymptom",(req,res)=>{
	trackSymptoms.callApi(req.body.searchText,(data)=>{

		// data contains the fetched symptoms from given general string
		symptoms.callApi((symptoms)=>{
			
			var counter = 0;
			let results = [];
			for(var i=0;i<data.mentions.length;i++){
				const params = {
					symptomName:data.mentions[i].name,
					year_of_birth:req.body.year_of_birth,
					gender:req.body.gender
				}

				//For each symptom fetch medical conditions
				medicalConditions.callApi(symptoms,params,(conditions)=>{

					//Store symptom name and fetched conditions for that symptom
					var newItem = {
						Symptom:params.symptomName,
						MedicalConditions:conditions
					}
					results.push(newItem);
					counter++;

					//If conditions for all symptoms is fetched the send response
					if(counter == (data.mentions.length)){
						res.json(results);
					}
				});
			}
		});
	});
});

module.exports = router;


