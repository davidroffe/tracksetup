angular.module('tsApp').directive('menu', function(){
  return {
    link: function(scope, element) {
      element.bind('click', function(e){
        function func(e){
          scope.clicked = false;
          scope.$apply();
          document.removeEventListener('click', func);
        }
        document.addEventListener('click', func);
      });
    }
      
  }
});