
angular.module('cribCuisineApp', ['ngRoute']);
var cuisineListCtrl = function ($scope, cribCuisineData) {
	cribCuisineData
	 .success(function(data){
	 	$scope.data = {cuisines: data};
	 })
 	 .error(function (e){
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