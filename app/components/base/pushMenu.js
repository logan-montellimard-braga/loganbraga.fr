'use strict'

angular.module('loganbraga')

.directive('pushMenuButton', [function() {
  return {
    restrict: 'A',
    replace: false,
    link: function($scope, $element, $attr) {
      $element.on('click', function() {
        var menu = angular.element(document.querySelectorAll($attr.targetMenu));
        var content = angular.element(document.getElementById('content'));

        content.on('click', function() {
          var isOpen = $element.hasClass('active');
          if (isOpen) {
            $element.removeClass('active');
            menu.removeClass('pushmenu-open');
            angular.element(document.body).removeClass('pushmenu-push-toright');
          }
        });

        $element.toggleClass('active');
        menu.toggleClass('pushmenu-open');
        angular.element(document.body).toggleClass('pushmenu-push-toright');
      });
    }
  };
}])

.directive('pushMenu', [function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var button = angular.element(document.querySelectorAll($attr.originButton));

      var links = $element.find('a');
      console.log(links);
      links.on('click', function() {
        $element.toggleClass('pushmenu-open');
        button.toggleClass('active');
        angular.element(document.body).toggleClass('pushmenu-push-toright');
      });
    }
  };
}]);
