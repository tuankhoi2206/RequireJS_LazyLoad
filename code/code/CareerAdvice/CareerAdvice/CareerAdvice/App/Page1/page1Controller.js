// we can mention the dependency file here too 
define(['angular', 'Page1/page1Service'], function (angular) {

    var SampleApp = angular.module('SampleApp.Pages');

    SampleApp.controller('page1Controller',
        ['$scope', '$http', 'page1Service', function (scope, http, page1Service) {

            scope.GetQuestions = function () {
                page1Service.GetQuestions().success(function (data) {

                }).
                error(function (data) {

                });
            }

        }]);

    return SampleApp;
});

