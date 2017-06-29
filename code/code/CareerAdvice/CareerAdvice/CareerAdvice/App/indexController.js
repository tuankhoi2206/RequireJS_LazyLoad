define(['angular'], function (angular) {
    var SampleApp = angular.module('SampleApp');
   

    SampleApp.controller('indexController',
        ['$scope', '$http', '$location', function (scope, http, $location) {

            scope.isActive = function (viewLocation) {
                debugger
                return viewLocation === $location.path();
            };

        }]);
});