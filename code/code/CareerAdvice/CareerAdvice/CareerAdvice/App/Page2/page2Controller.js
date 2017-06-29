// Mentioned the dependency file here itself
define(['angular'], function (angular) {

    var SampleApp = angular.module('SampleApp.Pages');

    SampleApp.registerController('page2Controller',
        ['$scope', '$http', 'page2Service', function (scope, http, page2Service) {

            scope.GetQuestions = function () {
                page1Service.GetQuestions().success(function (data) {

                }).
                error(function (data) {

                });
            }

        }]);

    return SampleApp;
});

