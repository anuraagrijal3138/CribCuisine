
angular.module('cribCuisineApp', ['ngRoute']);
var cuisineListCtrl = function ($scope, cribCuisineData) {
	$scope.message = "Searching for nearby Hosts";
	cribCuisineData
	 .success(function(data){
	 	//$scope.message = data.length > 0 ? "" : "No locations found";
	 	$scope.data = {cuisines: data};
	 })
 	 .error(function (e){
 	 	//$scope.message = Sorry, something's gone wrong";
 	 	console.log(e);
 	 });
};

var ratingStars = function () {
	return {
		scope: {
			thisRating : '=rating'
		},
		templateUrl : '/angular/rating-stars.html'
	};
};

var cribCuisineData = function ($http) {
	return $http.get('/api/cuisines');
}

angular
 .module('cribCuisineApp')
 .controller('cuisineListCtrl', cuisineListCtrl)
 .directive('ratingStars', ratingStars)
 .service('cribCuisineData', cribCuisineData);