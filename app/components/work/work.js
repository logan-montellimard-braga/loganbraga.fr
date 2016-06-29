'use strict';

function treatWorks(data) {
  _.map(data, function(o) {
    o.quotes = o.quote.split('\\n');
  });
  return data;
}

angular.module('loganbraga.work', [])

.controller('WorksCtrl', ['$scope', '$http', 'API_URL', function($scope, $http, API_URL) {

  $scope.work = {loading: true, error: false};

  $http.get(API_URL + '/works', {cache: true})
  .success(function(data) {
    $scope.works = treatWorks(data);
    $scope.work.loading = false;
  })
  .error(function() {
    $http.get('assets/static/works.json', {cache: true})
    .success(function(data) {
      $scope.works = treatWorks(data);
      $scope.work.loading = false;
    })
    .error(function() {
      $scope.works = {};
      $scope.work.error = true;
    });
  });
}])

.controller('WorksSkillCtrl', ['$location', '$routeParams', '$scope', '$http', 'API_URL', function($location, $routeParams, $scope, $http, API_URL) {
  $scope.work = {loading: true, error: false};
  $scope.technique = "";
  var id = $routeParams.id;

  $http.get(API_URL + '/skills/' + id, {cache: true})
    .success(function(data) {
      if (data === false) {
        $location.path('/404');
        return;
      }
      $scope.technique = data.name;
      $scope.works = treatWorks(data.works);
      $scope.work.loading = false;
    })
    .error(function() {
      $scope.works = {};
      $scope.work.error = true;
    });
}])

.controller('WorkCtrl', ['$location', '$sce', '$cacheFactory','$routeParams', '$scope', '$http', 'API_URL', function($location, $sce, $cacheFactory, $routeParams, $scope, $http, API_URL) {
  $scope.workState = {loading: true, error: false};
  var id = $routeParams.id;
  var httpCache = $cacheFactory.get('$http');
  var worksCache = httpCache.get(API_URL + '/works');

  if (worksCache && worksCache[1]) {
    _.forEach(JSON.parse(worksCache[1]), function(el) {
      if (el.id === id) {
        $scope.work = el;
        $scope.work.description = $sce.trustAsHtml($scope.work.description);
        $scope.workState.loading = false;
        return false;
      }
    });
  }

  if ($scope.work == undefined) {
    $http.get(API_URL + '/works/' + id, {cache: true})
    .success(function(data) {
      if (data === false) {
        $location.path('/404');
        return;
      }
      $scope.work = data;
      $scope.work.description = $sce.trustAsHtml($scope.work.description);
      $scope.workState.loading = false;
    })
    .error(function() {
      $scope.work = {};
      $scope.work.error = true;
    });
  }
}]);
