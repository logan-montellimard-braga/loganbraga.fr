'use strict'

angular.module('loganbraga')

.directive('pushMenuButton', [function() {
  return {
    restrict: 'A',
    replace: false,
    link: function($scope, $element, $attr) {
      $element.on('click', function() {
        var menu = angular.element(document.querySelectorAll($attr.targetMenu));

        $element.toggleClass('active');
        menu.toggleClass('pushmenu-open');
        angular.element(document.body).toggleClass('pushmenu-push-toright');
      });
    }
  }
}])

.directive('pushMenu', [function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      $element.on('click', function() {
        var button = angular.element(document.querySelectorAll($attr.originButton));

        $element.toggleClass('pushmenu-open');
        button.toggleClass('active');
        angular.element(document.body).toggleClass('pushmenu-push-toright');
      });
    }
  }
}]);
