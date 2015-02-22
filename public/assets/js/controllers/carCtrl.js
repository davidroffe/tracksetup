angular.module('tsApp').controller('carCtrl', ['$scope', '$resource', '$location', '$modal', function($scope, $resource, $location, $modal) {
	
	var Car = $resource('/api/getcars');

	Car.query(function(data){
		$scope.cars = data;
	});

	$scope.addCarOpen = function() {
		$modal.open({
			templateUrl: 'views/addCarView.html',
			controller: 'addCarCtrl',
			scope: $scope,
			backdrop: 'static'
		});
	};

}]);