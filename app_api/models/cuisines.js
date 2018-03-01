
var mongoose = require('mongoose');

//first we define the schema for subdocuments
//In our case, reviews and hosting Time are subdocuments
var reviewSchema = new mongoose.Schema({
 	author: String,
 	rating: {type: Number, required: true, min: 0, max: 5},
 	reviewText: String,
 	createdOn: {type: Date, default: Date.now}
}); 

var hostingTimeSchema = new mongoose.Schema({
 	days: {type: String, required: false},
 	opening: String,
 	closing: String,
 	closed: {type: Boolean, required: true}
});

var cuisineSchema = new mongoose.Schema({
	name: {type: String, required: true},
 	address: String,
 	rating: {type: Number, "default": 0, min: 0, max: 5},
 	intro: String,
 	hostingTimes: [hostingTimeSchema],
 	reviews: [reviewSchema]
});

mongoose.model('Cuisine', cuisineSchema);
