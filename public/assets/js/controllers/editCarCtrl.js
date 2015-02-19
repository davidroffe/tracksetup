angular.module('tsApp').controller('editCarCtrl', ['$scope', '$http', '$location','$modalInstance', '$stateParams', function($scope, $http, $location, $modalInstance, $stateParams) {
	var carId = $stateParams.id;

	console.log($scope.car.data);
	var editInit = function(){
		$scope.car.edit.name = $scope.car.data.name;
		$scope.car.edit.year = $scope.car.data.year;
		$scope.car.edit.make = $scope.car.data.make;
		$scope.car.edit.model = $scope.car.data.model;
	};

	editInit();

	$scope.$watch(function(){return $scope.image;}, function(e){
		if($scope.image){
			var formData = new FormData();
			formData.append('image', $scope.image[0]);
			$http.post('/api/uploadcar/' + carId, formData, {
				headers: {'Content-Type': undefined},
				transformRequest: angular.identity
			})
			.success(function(data){
				$scope.preview = data.url;
			})
			.error(function(err){

			});
		}
	})
	
	$scope.car.edit.submit = function() {

		var newData = {};
		var hasNewData = false;

		if($scope.car.edit.name !== $scope.car.data.name){
			newData.name = $scope.car.edit.name;
			hasNewData = true;
		}
		if($scope.car.edit.year !== $scope.car.data.year){
			newData.year = $scope.car.edit.year;
			hasNewData = true;
		}
		if($scope.car.edit.make !== $scope.car.data.make){
			newData.make = $scope.car.edit.make;
			hasNewData = true;
		}
		if($scope.car.edit.model !== $scope.car.data.model){
			newData.model = $scope.car.edit.model;
			hasNewData = true;
		}	

		if(hasNewData){
			$http.post('/api/editcar/' + carId, newData)
			.success(function(data){
				$http.get('/api/getcar/' + $scope.carId)
				.success(function(data) {

					$scope.car.data = data;
					editInit();

				})
				.error(function(data, status) {

					console.log('Could not retreive car, error is: ' + status);

				});
				$modalInstance.close();
			})
			.error(function(err){

			});
		} else {
			$scope.car.edit.error = 'Data has not changed';
		}
	};
	
	$scope.car.edit.cancel = function() {
		$modalInstance.close();
	};

}]);