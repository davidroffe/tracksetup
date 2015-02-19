angular.module('tsApp')
.directive('side', function(){
	return function(scope, element) {
		element.bind('click', function (){
			var toggled = !(element.data('toggled'));
			if(toggled){
				element.parent().parent().parent().attr('class', 'retract');
			} else {
				element.parent().parent().parent().attr('class', '');
			}
			element.data('toggled', toggled);
		});
	};
});