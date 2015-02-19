angular.module('tsApp').controller('addCarCtrl', ['$scope', '$http', '$location','$modalInstance', function($scope, $http, $location, $modalInstance) {
	$scope.submit = function() {
		console.log($scope.newCar.name + ', ' + $scope.newCar.year + ', ' + $scope.newCar.make + ', ' + $scope.newCar.model);
		$http.post('/addCar', {
			name: $scope.newCar.name,
			year: $scope.newCar.year,
			make: $scope.newCar.make,
			model: $scope.newCar.model
		})
		.success(function(data) {
			$modalInstance.close();
		})
		.error(function(data, error) {
			console.log('error is: ' + error);
		});
	};
	
	$scope.cancel = function() {
		$modalInstance.close();
	};

}]);