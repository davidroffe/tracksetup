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
		$scope.car.edit.error = [];
		var newData = {};
		var hasNewData = false;

		if($scope.car.edit.name !== $scope.car.data.name){
			if($scope.car.edit.name === '' || $scope.car.edit.name == undefined) {
				$scope.car.edit.error[0] = 'error';
			} else {
				newData.name = $scope.car.edit.name;
				hasNewData = true;
			}
		}
		if($scope.car.edit.year !== $scope.car.data.year){
			if($scope.car.edit.year === '' || $scope.car.edit.year == undefined) {
				$scope.car.edit.error[1] = 'error';
			} else {
				newData.year = $scope.car.edit.year;
				hasNewData = true;
			}
		}
		if($scope.car.edit.make !== $scope.car.data.make){
			if($scope.car.edit.make === '' || $scope.car.edit.make == undefined) {
				$scope.car.edit.error[2] = 'error';
			} else {
				newData.make = $scope.car.edit.make;
				hasNewData = true;
			}
		}
		if($scope.car.edit.model !== $scope.car.data.model){
			if($scope.car.edit.model === '' || $scope.car.edit.model == undefined) {
				$scope.car.edit.error[3] = 'error';
			} else {
				newData.model = $scope.car.edit.model;
				hasNewData = true;
			}
		}

		if(hasNewData && $scope.car.edit.error.length === 0){
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
			console.log('Success!');
		} else if(!hasNewData && $scope.car.edit.error.length === 0){
			$modalInstance.close();
		}
	};
	
	$scope.car.edit.cancel = function() {
		$modalInstance.close();
	};

}]);