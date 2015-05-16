'use strict';

angular.module('loganbraga',
               [
                 'ngRoute',
                 'ngAnimate',
                 'loganbraga.base',
                 'loganbraga.home',
                 'loganbraga.about',
                 'loganbraga.work',
                 'loganbraga.contact',
                 'uiGmapgoogle-maps'
               ])

.constant('API_URL', 'http://api.loganbraga.fr')

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'components/home/home.html',
    controller: 'HomeCtrl',
    title: ''
  })
  .when('/contact', {
    templateUrl: 'components/contact/contact.html',
    controller: 'ContactCtrl',
    title: 'Contact'
  })
  .when('/a-propos', {
    templateUrl: 'components/about/about.html',
    controller: 'AboutCtrl',
    title: 'À Propos'
  })
  .when('/travaux', {
    templateUrl: 'components/work/index.html',
    controller: 'WorksCtrl',
    title: 'Travaux'
  })
  .when('/travaux/:id', {
    templateUrl: 'components/work/show.html',
    controller: 'WorkCtrl',
    title: 'Travaux'
  })
  .otherwise({
    templateUrl: 'components/base/404.html',
    title: 'Erreur'
  });
}])

.run(['$rootScope', function($rootScope) {
  $rootScope.$on('$routeChangeSuccess', function(event, currentRoute, previousRoute) {
    $rootScope.title = currentRoute.title === '' ? '' : currentRoute.title + ' | ';
    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 400);
  });

  // FastClick lib for touch devices
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
    }, false);
  }
}]);
