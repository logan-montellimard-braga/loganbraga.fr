'use strict';

angular.module('loganbraga.about', [])

.controller('AboutCtrl', ['$scope', '$http','API_URL', function($scope, $http, API_URL) {
  $scope.qualif = {loading: true, error: false};
  $scope.exp = {loading: true, error: false};
  $scope.skill = {loading: true, error: false};

  function getLocalizedMonthAndYear(d) {
    var monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    if (isNaN(Date.parse(d)))
      return "Aujourd'hui";

    var date = new Date(d);
    return monthNames[date.getMonth()] + " " + date.getUTCFullYear();
  }

  function treatQualifications(data) {
    _.map(data, function(o) {
      o.date = new Date(o.date).getUTCFullYear();
      return o;
    });
    return data;
  }

  function treatExperiences(data) {
    data = _.sortByOrder(data, ['start_date'], [false]);

    _.map(data, function(o) {
      o.start_date = getLocalizedMonthAndYear(o.start_date);
      o.end_date = getLocalizedMonthAndYear(o.end_date);
      if (o.start_date === o.end_date) {
        o.duration = o.start_date;
      } else {
        o.duration = o.start_date + " - " + o.end_date;
      }
      return o;
    });
    return data;
  }

  $http.get(API_URL + '/qualifications', {cache: true})
  .success(function(data) {
    $scope.qualifications = treatQualifications(data);
    $scope.qualif.loading = false;
  })
  .error(function() {
    $http.get('assets/static/qualifications.json', {cache: true})
    .success(function(data) {
      $scope.qualifications = treatQualifications(data);
      $scope.qualif.loading = false;
    })
    .error(function() {
      $scope.qualifications = {};
      $scope.qualif.error = true;
    });
  });

  $http.get(API_URL + '/experiences', {cache: true})
  .success(function(data) {
    $scope.experiences = treatExperiences(data);
    $scope.exp.loading = false;
  })
  .error(function() {
    $http.get('assets/static/experiences.json', {cache: true})
    .success(function(data) {
      $scope.experiences = treatExperiences(data);
      $scope.exp.loading = false;
    })
    .error(function() {
      $scope.experiences = {};
      $scope.exp.error = true;
    });
  });

  $http.get(API_URL + '/skills', {cache: true})
  .success(function(data) {
    $scope.skills = data;
    $scope.skill.loading = false;
  })
  .error(function() {
    $http.get('assets/static/skills.json', {cache: true})
    .success(function(data) {
      $scope.skills = data;
      $scope.skill.loading = false;
    })
    .error(function() {
      $scope.skills = {}
      $scope.skill.error = true;
    });
  });

}])
