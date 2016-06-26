'use strict'

var openMenu = function(menu, button) {
  button.addClass('active');
  menu.addClass('pushmenu-open');
  angular.element(document.body).addClass('pushmenu-push-toright');
};

var closeMenu = function(menu, button) {
  button.removeClass('active');
  menu.removeClass('pushmenu-open');
  angular.element(document.body).removeClass('pushmenu-push-toright');
};

angular.module('loganbraga')

.directive('pushMenuButton', [function() {
  return {
    restrict: 'A',
    replace: false,
    link: function($scope, $element, $attr) {
      var doc = angular.element(document);

      doc.ready(function() {
        $element.ready(function() {

          document.onkeydown = function(e) {
            e = e || window.event;

            var tag = e.target.tagName.toLowerCase();
            if (['input', 'textarea'].indexOf(tag) > -1) return true;
            if (e.ctrlKey || e.shiftKey || e.altKey) return true;

            var menu = angular.element(document.querySelectorAll($attr.targetMenu));
            switch (e.keyCode) {
              case 37:
                closeMenu(menu, $element)
                break;
              case 39:
                openMenu(menu, $element)
                break;
            }
          };

          var hammer = new Hammer(document.body, {});

          hammer.on("panright", function() {
            var menu = angular.element(document.querySelectorAll($attr.targetMenu));
            var isOpen = $element.hasClass('active');
            if (!isOpen) { openMenu(menu, $element); }
          });

          hammer.on("panleft tap", function() {
            var menu = angular.element(document.querySelectorAll($attr.targetMenu));
            var isOpen = $element.hasClass('active');
            if (isOpen) { closeMenu(menu, $element); }
          });

          $element.on('click', function() {
            var menu = angular.element(document.querySelectorAll($attr.targetMenu));

            $element.toggleClass('active');
            menu.toggleClass('pushmenu-open');
            angular.element(document.body).toggleClass('pushmenu-push-toright');
          });
        });
      });
    }
  };
}])

.directive('pushMenu', [function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var button = angular.element(document.querySelectorAll($attr.originButton));

      var links = $element.find('a');
      links.on('click', function() {
        closeMenu($element, button);
      });
    }
  };
}]);
