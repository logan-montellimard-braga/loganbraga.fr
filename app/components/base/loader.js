'use strict'

angular.module('loganbraga')

.directive('loaderWindowLoad', [function() {
  return {
    restrict: 'A',
    replace: false,
    link: function($scope, $element, $attr) {
      document.body.style.overflowY = 'hidden';
      window.addEventListener('load', function() {
        $element.remove();
        document.body.style.overflowY = 'scroll';
      });
    }
  }
}])

.directive('embedLoader', [function() {
  return {
    restrict: 'A',
    transclude: true,
    scope: { showError: '=' },
    replace: true,
    templateUrl: 'components/base/embedLoader.html'
  }
}]);
