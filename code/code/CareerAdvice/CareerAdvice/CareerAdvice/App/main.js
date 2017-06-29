// contents of main:
require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        // Jquery
        'jquery': '../../scripts/jquery-1.9.1.min',

        // angular
        'angular': '../../scripts/angular.min',
        'angular_aria': '../../scripts/angular-aria',
        'angular_route': '../../scripts/angular-route.min',
        'angular_cookie': '../../scripts/angular-cookies',

        'angular_translate': '../../scripts/angular-translate/AngularTranslate',
        'angular_translate_cookie': '../../scripts/angular-translate-storage-cookie.min',

        'angular_animate': '../../scripts/angular-animate.min',

        // angular local storage
        'angular-local-storage': '../../scripts/angular-local-storage',

        // Angular bootstrap
        'angular_ui_bootstrap': '../../scripts/angular-ui/ui-bootstrap-tpls.min',

        'angular_ocLazyLoad': '../../scripts/ocLazyLoad/ocLazyLoad',

        //General
        'HomeController': 'home/homeController',
        'LandingModule': 'Landing/landingController',

        // For page1, the service has mentioned in the service files itself
        'indexController': 'indexController',
        'Page1Controller': 'Page1/page1Controller',

        'Page2Controller': 'Page2/page2Controller',
        'Page2Service': 'Page2/page2Service'
    },

    // Mention the dependencies
    shim: {
        'angular': {
            exports: 'angular'
        },
        'jquery': {
            exports: "$"
        },
        
        'angular_ocLazyLoad': {
            deps: ['angular']
        },
       
        'angular_route': {
            deps: ['angular']
        },
        'angular_cookie': {
            deps: ['angular']
        },

        'angular_ui_bootstrap': {
            deps: ['angular']
        },
       
        'app': {
            deps:
                ['angular_route', 'jquery'
                    //, 'angular_cookie'
                , 'angular_ocLazyLoad'
                //, 'angular-local-storage'
                , 'angular_ui_bootstrap'
                ]
        },

        
        'HomeController': {
            deps: ['app']
        },

        'Page1Controller': {
            deps: ['app']
        },
        'Page2Controller': {
            // Page 2 depends on the page1 file..
            // because the SampleApp.Pages module defined files is available there
            deps: ['Page1Controller', 'Page2Service']
        },
        'indexController': {
            deps: ['app']
        },
    },
    deps:['app']
});

require(['indexController'], function () {
    angular.bootstrap(document, ['SampleApp']);
});