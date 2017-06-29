define(['angular'], function (angular) {
    var SampleApp = angular.module('SampleApp.Pages', []);

    SampleApp.config(['$routeProvider', '$httpProvider', '$controllerProvider', '$provide',
    function ($routeProvider, $httpProvider, $controllerProvider, $provide) {
        SampleApp.registerController = $controllerProvider.register;
        SampleApp.$register = $provide;
        var version = "?bust=" + (new Date()).getTime();
        $routeProvider
            .when('/Page2', {
                title: 'Page2',
                templateUrl: 'App/Page2/Page2.html' + version,
                controller: 'page2Controller',
                caseInsensitiveMatch: true,
                resolve: {
                    loadModule: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
                        var deferred = $q.defer();

                        // After loading the controller file we need to inject the module
                        // to the parent module
                        require(["Page2Controller"], function () {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }]
                }
            });
    }]);

    SampleApp.factory('page1Service', ['$http', '$rootScope', function ($http, $rootScope) {
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

