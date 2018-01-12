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
        angular.bootstrap(document, ['chat.app']);
      });
    });

  // ***** config ***** //
  function config($i18nextProvider, $routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/login'
      })//song
      .when('/login', {
        templateUrl: 'scripts/login/login.directive.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }// end config

  function run($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
      // if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
      if (!authentication.isLoggedIn()) {
        $location.path('/login');
      }
    });
  }

  // ***** Inject *****//
  angular
    .module('chat.app')
    .config(['$i18nextProvider', '$routeProvider', config]);
  // .run(['$rootScope', '$location', 'AuthService', run]);
})();
