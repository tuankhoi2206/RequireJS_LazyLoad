(function () {
  'use strict';

  angular.module('songApp').directive('msCard', msCard);

  msCard.$inject = ['msCardConstant'];

  function msCard(msCardConstant) {
    return {
      restrict: 'AE',
      templateUrl: msCardConstant.templateUrl.msCardTemplate,
      scope: {
        config: '='
      },
      controller: 'msCardCtrl',
      controllerAs: 'vm',
      link: function (scope, element, attrs) {
        console.log('element', element);
      }
    };
  }
})();
