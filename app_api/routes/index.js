var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/cuisines');
var ctrlReviews = require('../controllers/reviews');
// cuisines

//router.get('/cuisines', ctrlLocations.cuisinesListByDistance);
router.post('/cuisines', ctrlLocations.cuisinesCreate);
router.get('/cuisines/:cuisineid', ctrlLocations.cuisinesReadOne);
router.put('/cuisines/:cuisineid', ctrlLocations.cuisinesUpdateOne);
router.delete('/cuisines/:cuisineid', ctrlLocations.cuisinesDeleteOne);


// reviews
router.post('/cuisines/:cuisineid/reviews', ctrlReviews.reviewsCreate);
router.get('/cuisines/:cuisineid/reviews/:reviewid',
ctrlReviews.reviewsReadOne);
router.put('/cuisines/:cuisineid/reviews/:reviewid',
ctrlReviews.reviewsUpdateOne);
router.delete('/cuisines/:cuisineid/reviews/:reviewid',
ctrlReviews.reviewsDeleteOne);
module.exports = router;