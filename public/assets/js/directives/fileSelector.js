angular.module('tsApp').directive('fileSelector', ['$http', function($http){
	return {
		restrict: 'A',
		link: function(scope, element){
			element.bind('click', function(e){
				this.children[0].click();
			});
			element.children().bind('change', function(e){
				scope.$apply(function(){
					scope.$parent.car.edit.image = e.target.files;
				});
			});
		}
	};
}]);