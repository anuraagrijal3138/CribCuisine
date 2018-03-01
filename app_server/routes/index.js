var express = require('express');
var router = express.Router();

//We have two collections, therefore we need two controllers
var ctrlCuisineAds = require('../controllers/cuisineAds');
var ctrlOthers = require('../controllers/others');

/* cuisine pages */
router.get('/', ctrlCuisineAds.homelist);
router.get('/cuisine/:cuisineid', ctrlCuisineAds.cuisineInfo);
router.get('/cuisine/:cuisineid/review/new', ctrlCuisineAds.addReview);
router.post('/cuisine/:cuisineid/review/new', ctrlCuisineAds.doAddReview);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;