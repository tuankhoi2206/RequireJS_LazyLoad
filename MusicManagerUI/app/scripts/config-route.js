(function () {
  'use strict';

  window.i18next
    .use(window.i18nextXHRBackend)
    .init({
      // debug: true,
      lng: 'en', // If not given, i18n will detect the browser language.
      fallbackLng: 'vi', // Default is dev
      ns: 'translation',
      backend: {
        loadPath: '../locales/{{lng}}/{{ns}}.json'
      },
      useCookie: false,
      useLocalStorage: false
    }, function () {
      angular.element(function () {
        angular.bootstrap(document, ['songApp']);
      });
    });

  var app = angular
    .module('songApp')
    .config(['$routeProvider', '$i18nextProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider',
      function ($routeProvider, $i18nextProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider) {
        // .config(['$routeProvider', '$i18nextProvider', '$controllerProvider', '$ocLazyLoadProvider',
        //   function ($routeProvider, $i18nextProvider, $controllerProvider, $ocLazyLoadProvider) {

        /**
         * configure the ocLazyLoader to use requireJS as the loader
         */
        $ocLazyLoadProvider.config({
          // debug: true,
          // events: true
          // ,
          // asyncLoader: require
        });

        /**
         * override angular default module api for creating components
         * @type {Function|register|register|register}
         * Description : http://www.sagarganatra.com/2014/08/lazy-loading-angularjs-components-using-providers.html,
         * http://ify.io/lazy-loading-in-angularjs/
         */
        app.controller = $controllerProvider.register;
        app.service = $provide.service;
        app.factory = $provide.factory;
        app.filter = $filterProvider.register;
        app.directive = $compileProvider.directive;

        /**
         * get referance to the route method of routeResolverProvider
         * @type {*}
         */
        // var route = routeResolverProvider.route;

        $routeProvider
          .when('/', {
            // redirectTo: '/songs'
            redirectTo: '/login'
          })//song
          .when('/login', {
            templateUrl: 'scripts/login/login.template.html',
            controller: 'LoginCtrl',
            controllerAs: 'vm',
            resolve: {
              lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                  files: [
                    'scripts/login/login.controller.js'
                  ]
                });
              }]
            }
          }).when('/songs', {
          templateUrl: 'scripts/song/songs.html',
          controller: 'SongCtrl',
          controllerAs: 'vm',
          resolve: {
            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                // load multiple file for template
                files: [
                  'scripts/song/song.controller.js',
                  'scripts/song/song.service.js'
                ]
              });
            }]
          }
        })
          .when('/playlists', {
            templateUrl: 'scripts/playlist/playlists.html',
            controller: 'PlaylistCtrl',
            controllerAs: 'vm',
            resolve: {
              lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                  // load multiple file for template
                  files: [
                    'scripts/song/song.service.js',
                    'scripts/playlist/playlist.service.js',
                    'scripts/playlist/playlists.controller.js',
                    'scripts/playlist/playlists.view.decorator.js',
                    'scripts/playlist/playlists.create.decorator.js',
                    'scripts/playlist/playlists.edit.decorator.js',
                    'scripts/playlist/playlists.edit.infortab.decorator.js',
                    'scripts/playlist/playlists.edit.songtab.decorator.js'
                  ]
                });
              }]
            }
          }).when('/demoDirective', {
          templateUrl: 'scripts/demo/demo-theme.html',
          controller: 'LoginCtrl',
          controllerAs: 'vm',
          resolve: {
            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                // load multiple file for template
                files: [
                  'scripts/demo/demo.controller.js'
                ]
              });
            }]
          }
        }).otherwise({
          redirectTo: '/songs'
        });
      }]).run(function ($rootScope) {
      console.log('rootScope');

    });
  return app;
})();
