var express = require('express');
var router = express.Router();

//We have two collections, therefore we need two controllers
var ctrlCuisineAds = require('../controllers/cuisineAds');
var ctrlOthers = require('../controllers/others');

/* cuisine pages */
router.get('/', ctrlCuisineAds.homelist);
router.get('/cuisine', ctrlCuisineAds.cuisineInfo);
router.get('/cuisine/review/new', ctrlCuisineAds.addReview);
/* Other pages */
router.get('/about', ctrlOthers.about);
module.exports = router;