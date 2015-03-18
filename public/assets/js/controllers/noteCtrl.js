angular.module('tsApp').controller('noteCtrl', ['$scope', '$http', '$stateParams', '$modalInstance', 'ModalHelper', function($scope, $http, $stateParams, $modalInstance, ModalHelper){
	$scope.carId = $stateParams.id;

	ModalHelper.handlerRemover = ModalHelper.disableNav($modalInstance.close.bind($modalInstance));
	$scope.note.cancel = function() {
		$modalInstance.close();
		ModalHelper.handlerRemover();
	};
}]);