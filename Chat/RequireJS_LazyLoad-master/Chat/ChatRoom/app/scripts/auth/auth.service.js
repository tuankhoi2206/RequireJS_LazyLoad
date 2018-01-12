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
      return $http.post(apiConstant.API.AUTH.REGISTER, user).;
    }

    /* check user */
    // function login(user) {
    //   $http({
    //     method: commonConstant.HTTP.METHOD.POST,
    //     url: commonConstant.API.AUTH.LOGIN,
    //     data: JSON.stringify(user),
    //     headers: commonConstant.HTTP.CONTENT_TYPE.JSON
    //   }).then(function success(response) {
    //     var data = response && response.data;
    //   }, function error(rawResponse) {
    //     var status = rawResponse && rawResponse.status;
    //     // if (status === 400 || status === 401) {
    //     //   $scope.showSpinner = false;
    //     //   $scope.showAlert = true;
    //     //   $scope.alertMessage = 'Login failed';
    //     // } else {
    //     //   postError();
    //     // }
    //   });
    /* check user */
    function login(user) {
      return $http({
        method: commonConstant.HTTP.METHOD.POST,
        url: commonConstant.API.AUTH.LOGIN,
        data: JSON.stringify(user),
        headers: commonConstant.HTTP.CONTENT_TYPE.JSON
      });
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
