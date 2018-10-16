var mongoose = require('mongoose');

var treatmentSchema = new mongoose.Schema({
	symptomName:String,
	id:mongoose.Schema.ObjectId,
	medication:String
});

const Treatment = mongoose.model('Treatment',treatmentSchema);

module.exports = Treatment;