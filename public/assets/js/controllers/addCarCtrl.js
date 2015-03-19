angular.module('tsApp').controller('addCarCtrl', ['$scope', '$Data', '$location','$modalInstance', 'ModalHelper', function($scope, $Data, $location, $modalInstance, ModalHelper) {
	$scope.newCar = {};
	ModalHelper.handlerRemover = ModalHelper.disableNav($modalInstance.close.bind($modalInstance));

	$scope.submit = function() {

		$scope.error = [];

		if($scope.newCar.name === '' || $scope.newCar.name === undefined) $scope.error[0] = 'error';
		if($scope.newCar.year === '' || $scope.newCar.year === undefined) $scope.error[1] = 'error';
		if($scope.newCar.make === '' || $scope.newCar.make === undefined) $scope.error[2] = 'error';
		if($scope.newCar.model === '' || $scope.newCar.model === undefined) $scope.error[3] = 'error';

		if($scope.error.length < 1){

			$scope.newCar.avatar = '/assets/img/car/default/def.png';
			
			$Data.save({data: 'car', action: 'add'}, $scope.newCar, function() {
				
				$scope.$parent.cars = $Data.query({data: 'car', action: 'getmulti'});

				$$scope.cancel();
			});
	
		}
	};

	$scope.cancel = function() {
		$modalInstance.close();
		ModalHelper.handlerRemover();
	};

}]);