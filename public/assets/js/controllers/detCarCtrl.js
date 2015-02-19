angular.module('tsApp').controller('detCarCtrl', ['$scope', '$http', '$stateParams', '$modal', function($scope, $http, $stateParams, $modal){
	//Car
	$scope.carId = $stateParams.id;
	$scope.car = {};
	$scope.car.edit = {};


	//Card
	$scope.card = {};
	$scope.card.add = {};
	$scope.card.del = {};
	$scope.card.del.chkBox = [];
	$scope.card.del.toDel = [];
	$scope.card.del.delButton = 'Delete';
	$scope.card.del.isOpen = false;
	$scope.cardClass = 'card-sel';
	$scope.card.del.keepOpen = '';
	$scope.card.del.canOrUndoLabel = 'Cancel';
	$scope.card.del.canOrUndoIcon = 'fa fa-lg fa-arrow-circle-o-left';


	//Notes
	$scope.note = {};
	$scope.note.add = {};
	$scope.note.noteSelClass = 'note-sel';
	$scope.note.del = {};
	$scope.note.del.chkBox = [];
	$scope.note.del.toDel = [];
	$scope.note.del.delButton = 'Delete';
	$scope.note.del.isOpen = false;
	$scope.note.del.keepOpen = '';
	$scope.note.del.canOrUndoLabel = 'Cancel';
	$scope.note.del.canOrUndoIcon = 'fa fa-lg fa-arrow-circle-o-left';


	$http.get('/api/getcar/' + $scope.carId)
	.success(function(data) {

		$scope.car.data = data;

	})
	.error(function(data, status) {

		console.log('Could not retreive car, error is: ' + status);

	});


	$http.get('/api/getcards/' + $scope.carId)
	.success(function(data) {

		$scope.card.data = data;

		$scope.card.dataCopy = data.slice();

		for (var i = 0; i < $scope.card.data.length; i++){ 
			$scope.card.del.chkBox[i] = 'check-sel fa fa-square-o';
		}

	})
	.error(function(data, status) {

		console.log('Could not retreive cards, error is: ' + status);

	});


	$http.get('/api/getnotes/' + $scope.carId)
	.success(function(data) {

		$scope.note.data = data;

		$scope.note.dataCopy = data.slice();

		for (var i = 0; i < $scope.note.data.length; i++){ 
			$scope.note.del.chkBox[i] = 'check-sel fa fa-close';
		}

	})
	.error(function(data, status) {

		console.log('Could not retreive notes, error is: ' + data.message);

	});

	

	$scope.card.del.open = function () {
		
		if(!$scope.card.del.isOpen){
			$scope.card.del.delButton = 'Apply';
			$scope.cardClass = 'card-sel del';
			$scope.card.del.keepOpen = 'keep-open';
			$scope.card.del.chkBox.forEach(function(el, ind, arr){
				console.log(el);
				//$scope.card.chkBox[ind] = 'check-sel fa fa-square-o del';
				$scope.card.del.chkBox[ind] = 'check-sel fa fa-close del';
			});
			$scope.card.del.isOpen = true;
			console.log($scope.card.del.chkBox[0]);
		} else {
			$scope.card.del.submit();
		}
		
	};


	$scope.card.del.cancelOrUndo = function() {

		if($scope.card.del.toDel.length < 1){
			$scope.cardClass = 'card-sel';
			$scope.card.del.keepOpen = '';
			$scope.card.del.chkBox.forEach(function(el, ind, arr){
				console.log(el);
				$scope.card.del.chkBox[ind] = 'check-sel fa fa-close';
			});
			$scope.card.del.isOpen = false;
			$scope.card.del.delButton = 'Delete';
		} else {
			$scope.card.data = $scope.card.dataCopy.slice();
			$scope.card.del.canOrUndoLabel = 'Cancel';
			$scope.card.del.canOrUndoIcon = 'fa fa-lg fa-arrow-circle-o-left';
			$scope.card.del.toDel = [];
		}
		
	};


	$scope.card.del.setDel = function(cardId, ind) {
		console.log(ind);
		$scope.card.del.toDel.push($scope.card.data[ind]._id);

		$scope.card.data.splice(ind, 1);
		$scope.card.del.canOrUndoLabel = 'Undo';
		$scope.card.del.canOrUndoIcon = 'fa fa-lg fa-undo';
	}



	$scope.card.del.submit = function () {
		
		if($scope.card.del.toDel.length < 1) {
			$scope.card.del.cancelOrUndo();
		} else {
			$http.post('/api/delcards/' + $scope.carId, $scope.card.del.toDel)
			.success(function(data){

				$http.get('/api/getcards/' + $scope.carId)
				.success(function(data) {

					$scope.card.data = data;
					$scope.card.del.toDel = [];
					$scope.card.del.cancelOrUndo();
					$scope.card.del.canOrUndoLabel = 'Cancel';
					$scope.card.del.canOrUndoIcon = 'fa fa-lg fa-arrow-circle-o-left';

				})
				.error(function(data, status) {

					console.log('Could not retreive cards, error is: ' + status);

				});

			})
			.error(function(err){

			});
		}
		
	}

	$scope.card.add.open = function() {

		$scope.card.add.modalInstance = $modal.open({
			templateUrl: './views/addCardView.html',
			controller: 'addCardCtrl',
			scope: $scope,
			backdrop: 'static'
		});

	};

	/*
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

	}*/


	//Note Section

	$scope.note.del.open = function () {
		
		if(!$scope.note.del.isOpen){
			$scope.note.del.delButton = 'Apply';
			$scope.note.noteSelClass = 'note-sel del';
			$scope.note.del.keepOpen = 'keep-open';

			$scope.note.del.chkBox.forEach(function(el, ind, arr){

				$scope.note.del.chkBox[ind] = 'check-sel fa fa-close del';
			
			});
			$scope.note.del.isOpen = true;
			console.log($scope.note.del.chkBox[0]);
		} else {
			$scope.note.del.submit();
		}
		
	};


	$scope.note.del.cancelOrUndo = function() {

		if($scope.note.del.toDel.length < 1){
			$scope.note.noteSelClass = 'note-sel';
			$scope.note.del.keepOpen = '';
		
			$scope.note.del.chkBox.forEach(function(el, ind, arr){

				$scope.note.del.chkBox[ind] = 'check-sel fa fa-close';

			});

			$scope.note.del.isOpen = false;
			$scope.note.del.delButton = 'Delete';
		} else {
			$scope.note.data = $scope.note.dataCopy.slice();
			$scope.note.del.canOrUndoLabel = 'Cancel';
			$scope.note.del.canOrUndoIcon = 'fa fa-lg fa-arrow-circle-o-left';
			$scope.note.del.toDel = [];
		}
		
	};


	$scope.note.del.setDel = function(cardId, ind) {
		$scope.note.del.toDel.push($scope.note.data[ind]._id);

		$scope.note.data.splice(ind, 1);
		$scope.note.del.canOrUndoLabel = 'Undo';
		$scope.note.del.canOrUndoIcon = 'fa fa-lg fa-undo';
	}

	$scope.note.del.submit = function () {
		
		if($scope.note.del.toDel.length < 1) {
			$scope.note.del.cancelOrUndo();
		} else {
			$http.post('/api/delnotes/' + $scope.carId, $scope.note.del.toDel)
			.success(function(data){

				$http.get('/api/getnotes/' + $scope.carId)
				.success(function(data) {

					$scope.note.data = data;
					$scope.note.del.toDel = [];
					$scope.note.del.cancelOrUndo();
					$scope.note.del.canOrUndoLabel = 'Cancel';
					$scope.note.del.canOrUndoIcon = 'fa fa-lg fa-arrow-circle-o-left';

				})
				.error(function(data, status) {

					console.log('Could not retreive cards, error is: ' + status);

				});

			})
			.error(function(err){

			});
		}
		
	}

	$scope.note.new = {};

	$scope.note.add.open = function(ind) {

		if(ind >= 0){
			$scope.note.new.title = $scope.note.data[ind].title;
			$scope.note.new.message = $scope.note.data[ind].message;
		} else {
			$scope.note.new ={};
		}
		$scope.note.add.modalInstance = $modal.open({
			templateUrl: './views/addNoteView.html',
			controller: 'addNoteCtrl',
			scope: $scope,
			backdrop: 'static'
		});

	};

	$scope.note.open = function(ind) {

		$scope.note.title = $scope.note.data[ind].title;
		$scope.note.message = $scope.note.data[ind].message;
	
		$scope.note.modalInstance = $modal.open({
			templateUrl: './views/noteView.html',
			controller: 'noteCtrl',
			scope: $scope,
			backdrop: 'static'
		});

	};

	$scope.test = 'Test';
	/*
	$scope.note.add.submit = function(){

		$http.post('/api/addnote/' + $scope.carId, $scope.note.new)
		.success(function(data){

			$http.get('/api/getnotes/' + $scope.carId)
			.success(function(data) {

				$scope.note.data = data;

			})
			.error(function(data, status) {

				console.log('Could not retreive notes, error is: ' + data.message);

			});

			$scope.note.add.modalInstance.close();

		})
		.error(function(data, status){

			console.log('Could not add note: ' + data.message);

		});

	};


	$scope.note.add.cancel = function() {

		$scope.note.add.modalInstance.close();

	};*/


	//Edit Car Modal
	$scope.car.edit.open = function() {

		$scope.car.edit.modalInstance = $modal.open({
			templateUrl: './views/editCarView.html',
			controller: 'editCarCtrl',
			scope: $scope,
			backdrop: 'static'
		});

	};


	$scope.$watch(function(){return $scope.car.edit.image;}, function(e){

		if ($scope.car.edit.image) {

			var formData = new FormData();

			formData.append('image', $scope.car.edit.image[0]);

			$http.post('/api/uploadcar/' + $scope.carId, formData, 
			{
				headers: {'Content-Type': undefined},
				transformRequest: angular.identity
			})
			.success(function(data){

				$http.get('/api/getcar/' + $scope.carId)
				.success(function(data) {
					$scope.car.data = data;

				})
				.error(function(data, status) {

					console.log('Could not retreive car, error is: ' + status);

				});
			})
			.error(function(err){

			});
		}
	});

	
	$scope.car.edit.submit = function() {


	};
	
	$scope.car.edit.cancel = function() {

		$scope.car.edit.modalInstance.close();

	};


}]);