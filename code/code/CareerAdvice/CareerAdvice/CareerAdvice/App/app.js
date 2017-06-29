/// <reference path="Home/Home.html" />
/// <reference path="Home/homeController.js" />

define(['require'], function (require) {
    var SampleApp = angular.module('SampleApp', ['ngRoute', 'ui.bootstrap', 'oc.lazyLoad']);

    SampleApp.config(['$routeProvider', '$httpProvider', '$controllerProvider', '$provide',
    function ($routeProvider, $httpProvider, $controllerProvider, $provide) {
        // To register controller and services which will be loaded lazily
        SampleApp.registerController = $controllerProvider.register;
        SampleApp.$register = $provide;
        var version = "?bust=" + (new Date()).getTime();
        $routeProvider
            .when('/Page1', {
                title: 'Page1',
                templateUrl: 'App/Page1/Page1.html' + version,
                controller: 'page1Controller',
                caseInsensitiveMatch: true,
                resolve: {
                    loadModule: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
                        debugger
                        var deferred = $q.defer();

                        // After loading the controller file we need to inject the module
                        // to the parent module
                        require(["Page1Controller"], function () {
                            // Using OcLazyLoad we can inject the any module to the parent module
                            $ocLazyLoad.inject('SampleApp.Pages');
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }]
                }
            })
             .when('/Landing', {
                 title: 'Landing',
                 templateUrl: 'App/Landing/Landing.html' + version,
                 controller: 'landingController',
                 caseInsensitiveMatch: true,
                 resolve: {
                     loadModule: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
                         debugger
                         var deferred = $q.defer();
                         require(["LandingModule"], function () { deferred.resolve(); });
                         return deferred.promise;
                     }]
                 }
             })
            .when('/home', {
                title: 'home',
                templateUrl: 'App/Home/Home.html' + version,
                controller: 'homeController',
                caseInsensitiveMatch: true,
                resolve: {
                    loadModule: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
                        debugger
                        var deferred = $q.defer();
                        require(["HomeController"], function () {
                            $ocLazyLoad.inject('SampleApp.Home');
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }]
                }
            }).otherwise({
                title: 'Landing',
                redirectTo: '/Landing'
            });

        $httpProvider.interceptors.push(
           ['$q', '$location',
           function ($q, $location) {
               return {
                   request: function (config) {
                       
                       return config;
                   },

                   response: function (result) {
                       return result;
                   },

                   responseError: function (rejection) {
                       console.log('Failed with', rejection.status, 'status');

                       return $q.reject(rejection);
                   }
               }
           }]);
    }]);

    SampleApp.run(
        ['$rootScope',
        function ($rootScope) {

        }]);
})
