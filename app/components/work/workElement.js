'use strict'

angular.module('loganbraga')

.directive('workElement', function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'components/work/workElement.html'
  }
});
