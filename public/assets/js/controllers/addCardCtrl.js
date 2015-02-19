angular.module('tsApp').controller('addCardCtrl', ['$scope', '$http', '$location', '$stateParams', '$modalInstance', function($scope, $http, $location, $stateParams, $modalInstance) {
	var carId = $stateParams.id;
	$scope.show = [];
	$scope.card.add.expandToggleLabel = 'Expand All';
	$scope.card.add.isExpand = false;

	for(var i=0;i<14;i++){
		$scope.show[i] = false;
	}
	$scope.card.add.submit = function() {

		$http.post('/api/addcard/' + $scope.carId, $scope.card.new)
		.success(function(data) {

			$scope.card.add.modalInstance.close();

		})
		.error(function(data, error) {

			console.log('error is: ' + error);

		});
	};


	$scope.card.add.cancel = function() {

		$scope.card.add.modalInstance.close();

	}

	$scope.card.add.expandAll = function(){
		$scope.card.add.expandToggleLabel = $scope.card.add.expandToggleLabel === 'Expand All' ? 'Collapse All' : 'Expand All';
		$scope.show.forEach(function(ele, ind){
			$scope.show[ind] = !$scope.card.add.isExpand;
		});
		$scope.card.add.isExpand = !$scope.card.add.isExpand;
	};

	/*
	$scope.submit = function() {
		//console.log($scope.newCard.name + ', ' + $scope.newCard.track);
		$http.post('/api/addcard/' + carId, $scope.newCard)
		.success(function(data) {
			$location.path('panel/car/' + carId);
		})
		.error(function(data, error) {
			console.log('error is: ' + error);
		});
	};

	$scope.cancel = function() {
		$modalInstance.close();
	}*/
	
	

}]);