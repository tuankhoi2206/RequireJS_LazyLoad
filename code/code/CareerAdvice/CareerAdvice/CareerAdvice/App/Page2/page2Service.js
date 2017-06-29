define(['angular'], function (angular) {
    var SampleApp = angular.module('SampleApp.Pages');

    SampleApp.$register.factory('page2Service', ['$http', '$rootScope', function ($http, $rootScope) {
        debugger
        return {
            GetQuestions: function () {
                return $http({
                    url: ""
                });
            }
        }
    }]);



    return SampleApp;
});

