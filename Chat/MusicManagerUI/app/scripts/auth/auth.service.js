(function () {
  'use strict';

  angular.module('chat.app')
    .service('AuthService', ['$http', '$q', 'commonConstant', AuthService]);

  function AuthService($http, $q, commonConstant) {

    var LOCAL_TOKEN_KEY = 'TokenKey';
    var isAuthenticated = false;
    var authToken;
    var apiConstant = commonConstant;

    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }//-- loadUserCredentials

    function useCredentials(token) {
      isAuthenticated = true;
      authToken = token;
      // Set the token as header for your requests!
      $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common.Authorization = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    function register(user) {
      return $http.post(apiConstant.api.auth.register, user);
    }

    /* check user */
    function login(user) {
      return $q($http.post(apiConstant.api.auth.login, user);
    }

    function logout() {
      destroyUserCredentials();
    }

    return {
      login: login,
      logout: logout,
      register: register,
      isAuthenticated: function () {
        return isAuthenticated;
      }
    };
  }

})();
