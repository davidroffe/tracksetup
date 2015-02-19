angular.module('tsApp').directive('menu', function(){
  return {
    link: function(scope, element) {
      element.bind('click', function(e){
        var clicked = element.data('clicked');
        clicked = !clicked;
        if(clicked === false ? false : true){
          element.children()[1].style.display = 'block';
        } else {
          element.children()[1].style.display = 'none';
        }
        element.data('clicked', clicked);
        e.stopPropagation();
      });
      
      document.onclick = function(){
        element.children()[1].style.display = 'none';
        element.data('clicked', false);
      };
    }
  };
});