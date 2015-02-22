angular.module('tsApp').controller('addCarCtrl', ['$scope', '$http', '$location','$modalInstance', function($scope, $http, $location, $modalInstance) {
	$scope.newCar = {};

	$scope.submit = function() {

		$scope.error = [];

		console.log($scope.newCar.name);

		if($scope.newCar.name === '' || $scope.newCar.name === undefined) $scope.error[0] = 'error';
		if($scope.newCar.year === '' || $scope.newCar.year === undefined) $scope.error[1] = 'error';
		if($scope.newCar.make === '' || $scope.newCar.make === undefined) $scope.error[2] = 'error';
		if($scope.newCar.model === '' || $scope.newCar.model === undefined) $scope.error[3] = 'error';

		if($scope.error.length < 1){

			console.log($scope.newCar.name + ', ' + $scope.newCar.year + ', ' + $scope.newCar.make + ', ' + $scope.newCar.model);
			$http.post('/api/addcar', {
				avatar: '/assets/img/car/default/def.png',
				name: $scope.newCar.name,
				year: $scope.newCar.year,
				make: $scope.newCar.make,
				model: $scope.newCar.model
			})
			.success(function(data) {
				$http.get('/api/getcars')
				.success(function(data) {
					$scope.$parent.cars = data;
				})
				.error(function(data, status) {
					console.log('status is: ' + status);
				});
				$modalInstance.close();
			})
			.error(function(data, error) {
				console.log('error is: ' + error);
			});
	
		}
	};
	
	$scope.cancel = function() {
		$modalInstance.close();
	};

}]);