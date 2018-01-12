(function () {
  'use strict';

  angular.module('chat.app')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'AuthService'];

  function LoginCtrl($scope, AuthService) {

    var vm = this;

    initCtrl();

    function initCtrl() {

      vm.user = {
        username: '',
        password: ''
      };

      vm.showSpinner = false;
      vm.showAlert = false;
      /* funcs*/
      vm.doLogin = doLogin;
    }

    function doLogin() {
      vm.showSpinner = true;
      AuthService.login(vm.user).then(function (response) {
        vm.showSpinner = false;
      }, function (error) {
        vm.showSpinner = false;
      });
    }

    function doShowSpinner() {
      vm.showSpinner = true;
    }

    function offSpinner() {

    }
  }
})();
