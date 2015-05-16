'use strict';

angular.module('loganbraga')

.directive('particles', ['$window', function($window) {
  return {
    restrict: 'A',
    replace: true,
    template: '<div id="particles"></div>',
    link: function(scope, element, attrs, fn) {

      if (angular.element(document.querySelector('html')).hasClass('canvas')) {
        $window.particlesJS('particles', {
          particles: {
            color: '#edecea',
            color_random: false,
            shape: 'circle',
            opacity: {
              opacity: 0.7,
              anim: {
                enable: false,
                opacity_min: 0,
                sync: false
              }
            },
            size: 1.2,
            size_random: true,
            nb: 70,
            line_linked: {
              enable_auto: false,
              opacity: 0,
              width: 0,
              condensed_mode: {
                enable: false
              }
            },
            anim: {
              enable: true,
              speed: 0.5
            }
          },
          interactivity: {
            enable: false,
            detect_on: 'canvas',
            mode: 'false',
            events: {
              onclick: {
                enable: false
              },
              onresize: {
                enable: true,
                mode: 'bounce',
                density_auto: true
              }
            }
          },
          retina_detect: false
        });
      }
    }
  };
}]);
