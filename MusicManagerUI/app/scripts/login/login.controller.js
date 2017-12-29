(function () {
  'use strict';
  angular.module('songApp')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope'];
  function LoginCtrl($scope) {

    var vm = this;

    initCtrl();
    function initCtrl() {

    }
  }

})();
