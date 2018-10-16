const request = require('request');
const config = require('../config/config.js');

const nearbyHospital = (lat,long,callback)=>{

	const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1000000&type=doctor&key=${config.GOOGLE_KEY}`;
	
	//Call google place api to get nearby doctors 
	request(url,(err,res,body)=>{
		if(err){
			return callback(err);
		}

		const items = JSON.parse(body).results;
		
		//Checks if any place found or not
	    if(items.length>0){
	        let result = [];
	        for(var i=0;i<items.length;i++){

	        	//Extracting required info from fetched data
	        	var newItem = {
	        		name:items[i].name,
	        		location:items[i].geometry.location,
	        		address:items[i].vicinity,
	        		openNow:items[i].opening_hours?items[i].opening_hours.open_now:true,
	        		rating:items[i].rating
	        	}
	        	result.push(newItem);
	        }
	        return callback(result);
	    }
	    else{
	        return callback({success:false,msg:"No Result Found"});
	    }
	});
}

module.exports = {
	callApi : nearbyHospital
};