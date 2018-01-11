(function () {
  'use strict';
  angular.module('chat.app')
    .directive('loginForm', LoginCtrl);

  function LoginCtrl() {
    return {
      restrict: 'AE',
      controller: 'LoginCtrl',
      templateUrl: 'scripts/login/login.directive.html'
    };
  }

})();
