'use strict';

angular.module('loganbraga.contact', [])

.controller('ContactCtrl', ['$scope', '$http', 'API_URL', function($scope, $http, API_URL) {
  // Gmaps
  $scope.map = {
    center: {latitude: 48.2973451, longitude: 4.0744009000000005},
    zoom: 6,
    marker: {
      cords: {latitude: 48.2973451, longitude: 4.0744009000000005},
      icon: 'assets/img/solid-pin-red.png',
      options: {
        icon: 'assets/img/solid-pin-red.png'
      }
    },
    options: {
      draggingCursor: 'pointer',
      draggableCursor: 'pointer',
      disableDefaultUI: true,
      disableDoubleClickZoom: false,
      scrollwheel: false,
      draggable : true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}],
    }
  };
  $scope.map.options_strict = $scope.map.options;
  $scope.map.options_strict.draggable = false;
  $scope.map.options_strict.draggingCursor = 'normal';
  $scope.map.options_strict.draggableCursor = 'normal';
  $scope.map.options_strict.disableDoubleClickZoom = true;

  $scope.formData = {};
  $scope.okay = false;
  $scope.error = false;
  $scope.isSending = false;

  $scope.sendMessage = function() {
    $scope.isSending = true;
    if (!$scope.okay) {
      $http({
        method: 'POST',
        url: API_URL + '/messages',
        data: $scope.formData,
        headers: {'Content-Type': 'application/json'},
      })
      .success(function() {
        $scope.okay = true;
        $scope.error = false;
      })
      .error(function() {
        $scope.isSending = false;
        $scope.error = true;
        $scope.okay = false;
      });
    }
  };
}]);
