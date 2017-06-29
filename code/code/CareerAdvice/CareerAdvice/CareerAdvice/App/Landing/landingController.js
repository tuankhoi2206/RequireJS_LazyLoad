define(['angular'], function (angular) {
    var SampleApp = angular.module('SampleApp');
    debugger
    SampleApp.$register.factory('landingService', ['$http', '$rootScope', function ($http, $rootScope) {
        debugger
        return {
            GetQuestions: function () {
                return $http({
                    url: ""
                });
            }
        }
    }]);

    SampleApp.registerController('landingController',
        ['$scope', '$http', 'landingService', function (scope, http, landingService) {

            scope.GetQuestions = function () {
                landingService.GetQuestions().success(function (data) {

                }).
                error(function (data) {

                });
            }

        }]);
});

