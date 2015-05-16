'use strict';

angular.module('loganbraga.base', [])

.controller('BaseCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.meta = {
    blog: "http://blog.loganbraga.fr",
    github: "https://github.com/loganbraga",
    linkedin: "https://www.linkedin.com/pub/logan-braga/a3/503/314",
    mail: "contact@loganbraga.fr",
    year: new Date().getFullYear()
  };

  $scope.isCurrentView = function(viewName, strict) {
    if (strict) {
      return viewName === $location.path();
    }
    return $location.path().indexOf(viewName) === 0;
  };

  // Age calculation
  $scope.getAge = function getAge(birthdate) {
    var bdate = new Date(birthdate);
    var ageDifMs = Date.now() - bdate.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
}]);
