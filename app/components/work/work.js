'use strict';

angular.module('loganbraga.work', [])

.controller('WorksCtrl', ['$scope', '$http', 'API_URL', function($scope, $http, API_URL) {

  $scope.work = {loading: true, error: false};

  function treatWorks(data) {
    _.map(data, function(o) {
      o.quotes = o.quote.split('\n');
    });
    return data;
  }

  $http.get(API_URL + '/works', {cache: true})
  .success(function(data) {
    data = [
      {
        'id':1,
        'title':'Lorem Ipsum',
        'quote': 'Lorem Ipsum Dolor\nSit amet\nconsectetur adipiscing elit',
        'summary':'lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. at vero eos et accusam et justo duo dolores et ea rebum. stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet.',
        'description':'',
        'image_url':'',
        'thumbnail_url':'hobbes_thumbnail_color.png',
        'website_url':'',
        'github_url':'',
        'featured':true
      },
      {
        'id':2,
        'title':'Lorem Ipsum',
        'quote': 'Lorem Ipsum Dolor\nSit amet\nconsectetur adipiscing elit',
        'summary':'lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. at vero eos et accusam et justo duo dolores et ea rebum. stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet.',
        'description':'',
        'image_url':'',
        'thumbnail_url':'culprit_thumbnail_color.png',
        'website_url':'',
        'github_url':'',
        'featured':true
      },
      {
        'id':3,
        'title':'Lorem Ipsum',
        'quote': 'Lorem Ipsum Dolor\nSit amet\nconsectetur adipiscing elit',
        'summary':'lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. at vero eos et accusam et justo duo dolores et ea rebum. stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet.',
        'description':'',
        'image_url':'',
        'thumbnail_url':'culprit_thumbnail_color.png',
        'website_url':'',
        'github_url':'',
        'featured':false
      },
      {
        'id':4,
        'title':'Lorem Ipsum',
        'quote': 'Lorem Ipsum Dolor\nSit amet\nconsectetur adipiscing elit',
        'summary':'lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. at vero eos et accusam et justo duo dolores et ea rebum. stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet.',
        'description':'',
        'image_url':'',
        'thumbnail_url':'breakinvaders_thumbnail_color.png',
        'website_url':'',
        'github_url':'',
        'featured':true
      }
    ];

    $scope.work.loading = false;
    $scope.works = treatWorks(data);
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

.controller('WorkCtrl', ['$sce', '$cacheFactory','$routeParams', '$scope', '$http', 'API_URL', function($sce, $cacheFactory, $routeParams, $scope, $http, API_URL) {
  $scope.workState = {loading: true, error: false};
  var id = $routeParams.id;
  var httpCache = $cacheFactory.get('$http');
  var worksCache = httpCache.get(API_URL + '/works');

  if (worksCache && worksCache[1]) {
    _.forEach(JSON.parse(worksCache[1]), function(el) {
      if (el.id === id) {
        $scope.work = el;
        return false;
      }
    });
  }

  if ($scope.work == undefined) {
    $http.get(API_URL + '/works/' + id, {cache: true})
    .success(function(data) {
      $scope.work = data;
      $scope.work =
        {
          'id':4,
          'title':'Lorem Ipsum',
          'quotes': 'Lorem Ipsum Dolor\nSit amet\nconsectetur adipiscing elit'.split('\n'),
          'summary':'lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. at vero eos et accusam et justo duo dolores et ea rebum. stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet.',
          'description': $sce.trustAsHtml('Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'),
          'image_url':'http://loganbraga.fr/assets/img/gallery/logos/breakinvaders_logo.png',
          'thumbnail_url':'breakinvaders_thumbnail_color.png',
          'website_url':'/',
          'github_url':'/',
          'featured':true,
          'skills': ['clojure', 'poo', 'c++', 'html']
        }
        $scope.workState.loading = false;
    })
    .error(function() {
      $scope.work = {};
      $scope.work.error = true;
    });
  }
}]);
