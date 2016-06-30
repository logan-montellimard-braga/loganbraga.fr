'use strict'

var cleanSeenAlerts = function(localStorageService) {
  var seenAlerts = localStorageService.get('alerts') || {};
  var keys = _.keys(seenAlerts);
  var cleanedAlerts = {};

  _.forEach(keys, function(k) {
    var dateExp = new Date(seenAlerts[k]);
    dateExp.setDate(dateExp.getDate() + 6); // expire auto-hiding after 6 days

    var now = new Date();

    if (dateExp.getTime() > now.getTime()) { cleanedAlerts[k] = seenAlerts[k]; }
  });

  localStorageService.set('alerts', cleanedAlerts);
};

var removeAlert = function(data, id) {
  var newData = [];
  _.forEach(data, function(ob) {
    if (typeof id == 'object') {
      if (id.indexOf(ob['id']) === -1) newData.push(ob);
    } else {
      if (ob['id'] != id) newData.push(ob);
    }
  });
  return newData;
};

angular.module('loganbraga')

  .directive('messagesContainer', ['$http', 'API_URL', 'localStorageService', function($http, API_URL, localStorageService) {
    return {
      restrict: 'A',
      scope: false,
      replace: true,
      link: function($scope, $element, $attr) {
        $scope.pastHeader = false;
        var timer;
        var refresh = function() {
          var currentPos = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentPos > window.innerHeight + 10) {
            $scope.$apply(function() { $scope.pastHeader = true; });
          } else {
            $scope.$apply(function() { $scope.pastHeader = false; });
          }
        };
        window.addEventListener('scroll', function() {
          clearTimeout(timer);
          timer = setTimeout(refresh, 200);
        });

        $http.get(API_URL + '/alerts', {cache: true})
          .success(function(data) {
            cleanSeenAlerts(localStorageService);
            var seenAlerts = _.keys(localStorageService.get('alerts') || {});
            $scope.alerts = removeAlert(data, seenAlerts);

            $element.ready(function() {
              $element.find('a').on('click', function() {
                var identifier = this.getAttribute('data-identifier');
                $scope.$apply(function() {
                  $scope.alerts = removeAlert(data, identifier);
                });

                var seenAlerts = localStorageService.get('alerts') || {};
                seenAlerts[identifier] = new Date();
                localStorageService.set('alerts', seenAlerts);
              });
            })
          })
          .error(function() {
            // do nothing
          });
      },
      templateUrl: 'components/base/messages.html'
    };
  }]);
