angular.module('tsApp').controller('editCarCtrl', ['$scope', '$http', '$Data', '$location','$modalInstance', '$stateParams', 'ModalHelper', function($scope, $http, $Data, $location, $modalInstance, $stateParams, ModalHelper) {
	var carId = $stateParams.id;
	//copy initial data to compare against later
	$scope.car.edit.data = copyObj($scope.car.data);

	ModalHelper.handlerRemover = ModalHelper.disableNav($modalInstance.close.bind($modalInstance));


	$scope.$watch(function(){return $scope.car.edit.image;}, function(e){

		if ($scope.car.edit.image) {

			var formData = new FormData();

			formData.append('image', $scope.car.edit.image[0]);

			$http.post('/api/car/upload/' + $scope.carId, formData, 
			{
				headers: {'Content-Type': undefined},
				transformRequest: angular.identity
			})
			.success(function(data){

				$Data.get({data: 'car', action: 'getsingle', id: $scope.carId}, function(data){
					$scope.car.data = data;
				});

			})
			.error(function(err){

			});
		}
	});
	
	$scope.car.edit.submit = function() {
		$scope.car.edit.error = [];
		var newData = {};
		var hasNewData = false;

		if($scope.car.edit.data.name !== $scope.car.data.name){
			if($scope.car.edit.data.name === '' || $scope.car.edit.data.name == undefined) {
				$scope.car.edit.error[0] = 'error';
			} else {
				newData.name = $scope.car.edit.data.name;
				hasNewData = true;
			}
		}
		if($scope.car.edit.data.year !== $scope.car.data.year){
			if($scope.car.edit.data.year === '' || $scope.car.edit.data.year == undefined) {
				$scope.car.edit.error[1] = 'error';
			} else {
				newData.year = $scope.car.edit.data.year;
				hasNewData = true;
			}
		}
		if($scope.car.edit.data.make !== $scope.car.data.make){
			if($scope.car.edit.data.make === '' || $scope.car.edit.data.make == undefined) {
				$scope.car.edit.error[2] = 'error';
			} else {
				newData.make = $scope.car.edit.data.make;
				hasNewData = true;
			}
		}
		if($scope.car.edit.data.model !== $scope.car.data.model){
			if($scope.car.edit.data.model === '' || $scope.car.edit.data.model == undefined) {
				$scope.car.edit.error[3] = 'error';
			} else {
				newData.model = $scope.car.edit.data.model;
				hasNewData = true;
			}
		}

		if(hasNewData && $scope.car.edit.error.length === 0){
			$Data.save({data: 'car', action: 'edit', id: carId}, newData, function(data){
				
				$scope.car.data = $scope.car.edit.data;

				$scope.car.edit.cancel();
			});
		} else if(!hasNewData && $scope.car.edit.error.length === 0){
			$scope.car.edit.cancel();
		}
	};
	
	$scope.car.edit.cancel = function() {
		$modalInstance.close();
		ModalHelper.handlerRemover();
	};

	function copyObj (obj){
		if(obj == null || "object" != typeof obj) return obj;

		var copy = {};

		for (var prop in obj) {
			if(prop.indexOf('__') === -1 && prop.indexOf('$') === -1) {
				if(obj.hasOwnProperty(prop)) copy[prop] = copyObj(obj[prop]);
			}
		}

		return copy;
	}

}]);