angular.module('tsApp')
.directive('inputToggle', function(){
	return function(scope, element) {
		element.bind('click', function (){
			var notToggled = !(element.data('toggled'));
			if(notToggled){
				element.next.css("display", "none");
			} else {
				element.next.css("display", "block");
			}
			element.data('toggled', toggled);
		});
	};
});