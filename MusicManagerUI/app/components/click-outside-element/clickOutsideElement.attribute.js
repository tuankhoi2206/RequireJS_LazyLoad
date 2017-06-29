/**
 * Created by hoang yen on 25/06/2017.
 */
(function () {
  'use strict';
  angular.module('songApp').directive('clickOutsideElement', function ($document) {
    return {
      restrict: 'A',
      scope: {
        clickOutsideElement: "=onClick"
      },
      link: function (scope, element, attr) {

        function elementClick(e) {
          e.stopPropagation();
        }

        element.on('click', elementClick);

        $document.bind('click', function () {
          scope.$apply(attr.clickOutsideElement);
        });

        // remove event handlers when directive is destroyed
        scope.$on('$destroy', function () {
          element.off('click', elementClick);
          // $document.off('click', documentClick);
        });
      }
    };
  });
})();
