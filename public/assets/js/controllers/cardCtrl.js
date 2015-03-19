angular.module('tsApp').controller('cardCtrl', ['$scope', '$Data', '$stateParams', '$modal', 'ModalHelper', function($scope, $Data, $stateParams, $modal, ModalHelper){
	var cardId = $stateParams.id;
	$scope.carId = $scope.$parent.carId;
	$scope.card = {};

	$Data.get({data: 'card', action: 'getsingle', id: cardId}, function(data){
		$scope.card.data = data;
		$scope.carId = $scope.carId || data.car;
	});

	$scope.edit = function(){
		$scope.card.dataCopy = copyObj($scope.card.data);

		modalInstance = $modal.open({
			templateUrl: '/views/editCardView.html',
			scope: $scope,
			backdrop: 'static'
		});

		ModalHelper.handlerRemover = ModalHelper.disableNav(modalInstance.close.bind(modalInstance));
		$scope.cancel = function() {
			modalInstance.close();
			ModalHelper.handlerRemover();
		};

		$scope.submit = function() {

			$scope.error = [];

			if($scope.card.dataCopy.name === '' || $scope.card.dataCopy.name === undefined) $scope.error[0] = 'error';
			if($scope.card.dataCopy.track === '' || $scope.card.dataCopy.track === undefined) $scope.error[1] = 'error';

			if($scope.error.length < 1){
				$Data.save({data: 'card', action: 'edit', id: cardId}, $scope.card.dataCopy, function(){
					$scope.card.data = $scope.card.dataCopy;
				});
				$scope.cancel();
			}
		};
	};

	var copyObj = function(obj){
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