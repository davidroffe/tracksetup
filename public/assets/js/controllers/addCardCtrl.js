angular.module('tsApp').controller('addCardCtrl', ['$scope', '$http', '$location', '$stateParams', '$modalInstance', function($scope, $http, $location, $stateParams, $modalInstance) {
	var carId = $stateParams.id;
	$scope.show = [];
	$scope.card = {};
	$scope.card.add = {};
	$scope.card.new = {};
	$scope.card.add.expandToggleLabel = 'Expand All';
	$scope.card.add.isExpand = false;

	for(var i=0;i<14;i++){
		$scope.show[i] = false;
	}
	$scope.card.add.submit = function() {

		$scope.error = [];

		console.log($scope.card.new.name);

		if($scope.card.new.name === '' || $scope.card.new.name === undefined) $scope.error[0] = 'error';
		if($scope.card.new.track === '' || $scope.card.new.track === undefined) $scope.error[1] = 'error';

		if($scope.error.length < 1){

			$http.post('/api/addcard/' + $scope.carId, $scope.card.new)
			.success(function(data) {

				$http.get('/api/getcards/' + $scope.carId)
				.success(function(data) {

					$scope.$parent.card.data = data;

					$scope.$parent.card.dataCopy = data.slice();

					for (var i = 0; i < $scope.$parent.card.data.length; i++){ 
						$scope.$parent.card.del.chkBox[i] = 'check-sel fa fa-square-o';
					}

				})
				.error(function(data, status) {

					console.log('Could not retreive cards, error is: ' + status);

				});

				$scope.error = [];
				$modalInstance.close();

			})
			.error(function(data, error) {

				console.log('error is: ' + error);

			});

		}
	};


	$scope.card.add.cancel = function() {

		$scope.error = [];
		$modalInstance.close();

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