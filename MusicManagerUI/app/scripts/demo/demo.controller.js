(function () {
  'use strict';
  angular.module('songApp')
    .controller('DemoCtrl', DemoCtrl);

  DemoCtrl.$inject = ['$scope'];

  function DemoCtrl($scope) {
    var vm = this;

    initCtrl();

    function initCtrl() {
      vm.initViewObj = {};
      
    }
  }

})();
