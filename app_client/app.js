(function () {

	angular.module('cribCuisineApp', ['ngRoute']);

function config ($routeProvider) {
	$routeProvider
		.when('/',{
			templateUrl: 'home/home.view.html',
			controller: 'homeCtrl',
			controllerAs: 'vm'
		})
		.otherwise({redirectTo: '/'});
}

angular
	.module('cribCuisineApp')
	.config(['$routeProvider', config]);
	
})();
