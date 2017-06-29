define(['angular'], function (angular) {
    debugger
    var SampleApp = angular.module('SampleApp.Home',[]);
    
    SampleApp.factory('homeService', ['$http', '$rootScope', function ($http, $rootScope) {
        debugger
        return {
            GetQuestions: function () {
                return $http({
                    url: ""
                });
            }
        }
    }]);

    SampleApp.controller('homeController',
        ['$scope', '$http', 'homeService', function (scope, http, homeService) {

            scope.GetQuestions = function () {
                homeService.GetQuestions().success(function (data) {

                }).
                error(function (data) {

                });
            }

        }]);

    return SampleApp;
});

