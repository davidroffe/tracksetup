angular.module('tsApp').controller('detCarCtrl', ['$scope', '$stateParams', '$modal', '$http', '$Data', function($scope, $stateParams, $modal, $http, $Data){
	
	//Car
	$scope.carId = $scope.$parent.carId = $stateParams.id;
	$scope.car = {};
	$scope.car.edit = {};
	$scope.car.data = $Data.get({data: 'car', action:'getsingle', id:$scope.carId});

	//Card
	$scope.card = {};
	$scope.card.add = {};
	$scope.card.del = {};
	$scope.card.del.chkBox = [];
	$scope.card.del.toDel = [];
	$scope.card.del.delButton = 'Delete';
	$scope.card.del.isOpen = false;
	$scope.card.del.keepOpen = '';
	$scope.card.del.canOrUndoLabel = 'Cancel';
	$scope.card.del.canOrUndoIcon = 'fa fa-lg fa-arrow-circle-o-left';
	$scope.cardClass = 'card-sel';
	$scope.card.titleClass = 'empty';


	$Data.query({data: 'card', action: 'getmulti', id: $scope.carId}, function(data){
		$scope.card.data = data;

		$scope.card.dataCopy = data.slice();

		for (var i = 0; i < $scope.card.data.length; i++){ 
			$scope.card.del.chkBox[i] = 'check-sel fa fa-square-o';
		}

		$scope.card.titleClass = data.length > 0 ? '' : 'empty';
	});


	//Notes
	$scope.note = {};
	$scope.note.add = {};
	$scope.note.noteSelClass = 'note-sel';
	$scope.note.titleClass = 'empty';
	$scope.note.del = {};
	$scope.note.del.chkBox = [];
	$scope.note.del.toDel = [];
	$scope.note.del.delButton = 'Delete';
	$scope.note.del.isOpen = false;
	$scope.note.del.keepOpen = '';
	$scope.note.del.canOrUndoLabel = 'Cancel';
	$scope.note.del.canOrUndoIcon = 'fa fa-lg fa-arrow-circle-o-left';


	$Data.query({data: 'note', action: 'getmulti', id: $scope.carId}, function(data){

		$scope.note.data = data;

		$scope.note.dataCopy = data.slice();

		for (var i = 0; i < $scope.note.data.length; i++){ 
			$scope.note.del.chkBox[i] = 'check-sel fa fa-close';
		}

		$scope.note.titleClass = data.length > 0 ? '' : 'empty';

	});

	
	//card delete methods
	$scope.card.del.open = function () {
		
		if(!$scope.card.del.isOpen){
			$scope.card.del.delButton = 'Apply';
			$scope.cardClass = 'card-sel del';
			$scope.card.del.keepOpen = 'keep-open';
			$scope.card.del.chkBox.forEach(function(el, ind, arr){
				//$scope.card.chkBox[ind] = 'check-sel fa fa-square-o del';
				$scope.card.del.chkBox[ind] = 'check-sel fa fa-close del';
			});
			$scope.card.del.isOpen = true;
		} else {
			$scope.card.del.submit();
		}
		
	};


	$scope.card.del.cancelOrUndo = function() {

		if($scope.card.del.toDel.length < 1){
			$scope.cardClass = 'card-sel';
			$scope.card.del.keepOpen = '';
			$scope.card.del.chkBox.forEach(function(el, ind, arr){
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
		$scope.card.del.toDel.push($scope.card.data[ind]._id);

		$scope.card.data.splice(ind, 1);
		$scope.card.del.canOrUndoLabel = 'Undo';
		$scope.card.del.canOrUndoIcon = 'fa fa-lg fa-undo';
	};



	$scope.card.del.submit = function () {
		
		if($scope.card.del.toDel.length < 1) {
			$scope.card.del.cancelOrUndo();
		} else {
			$Data.save({data: 'card', action: 'del', id: $scope.carId}, $scope.card.del.toDel, function(){

				$Data.query({data: 'card', action: 'getmulti', id: $scope.carId}, function(data){
					$scope.card.data = data;

					$scope.card.dataCopy = data.slice();

					$scope.card.del.toDel = [];
					$scope.card.del.cancelOrUndo();
					$scope.card.del.canOrUndoLabel = 'Cancel';
					$scope.card.del.canOrUndoIcon = 'fa fa-lg fa-arrow-circle-o-left';
				});

			});
		}
	};


	//Note delete methods
	$scope.note.del.open = function () {
		
		if(!$scope.note.del.isOpen){
			$scope.note.del.delButton = 'Apply';
			$scope.note.noteSelClass = 'note-sel del';
			$scope.note.del.keepOpen = 'keep-open';

			$scope.note.del.chkBox.forEach(function(el, ind, arr){

				$scope.note.del.chkBox[ind] = 'check-sel fa fa-close del';
			
			});
			$scope.note.del.isOpen = true;
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
			$Data.save({data: 'note', action: 'del', id: $scope.carId}, $scope.note.del.toDel, function(){

				$Data.query({data: 'note', action: 'getmulti', id: $scope.carId}, function(data){

					$scope.note.data = data;

					$scope.note.dataCopy = data.slice();

					$scope.note.del.toDel = [];
					$scope.note.del.cancelOrUndo();
					$scope.note.del.canOrUndoLabel = 'Cancel';
					$scope.note.del.canOrUndoIcon = 'fa fa-lg fa-arrow-circle-o-left';

				});

			});
		}
		
	}


	//Modal triggers
	$scope.card.add.open = function() {

		$scope.card.add.modalInstance = $modal.open({
			templateUrl: './views/addCardView.html',
			controller: 'addCardCtrl',
			scope: $scope,
			backdrop: 'static'
		});

	};
	
	$scope.note.add.open = function(ind) {

		$modal.open({
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

	$scope.car.edit.open = function() {

		$scope.car.edit.modalInstance = $modal.open({
			templateUrl: './views/editCarView.html',
			controller: 'editCarCtrl',
			scope: $scope,
			backdrop: 'static'
		});

	};
}]);