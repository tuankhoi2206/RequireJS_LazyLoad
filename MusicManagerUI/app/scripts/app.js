(function () {
  'use strict';
  angular.module('songApp')
    .controller('AppCtrl', ['$i18next', '$location', '$scope', 'appService', 'commonConstant',
      function (i18next, $location, $scope, appService, commonConstant) {

        var vm = this;
        var cacheMenu = appService.cache;

        function init() {

          vm.isShowSideBar = false;
          vm.changeLang = changeLang;
          vm.isSongMenu = isSongMenu;
          vm.isEnLanguge = isEnLanguge;
          vm.isPlaylistMenu = isPlaylistMenu;
          vm.changeRoute = changeRoute;
          vm.changeShowSideBar = changeShowSideBar;
          setCurrentMenu($location.path());

        }

        init();

        function setCurrentMenu(path) {
          if ('/songs' === path || '/' === path) {
            cacheMenu.currentMenu.name = commonConstant.MENU_MODE.SONG;
          } else if ('playlists' === path) {
            cacheMenu.currentMenu.name = commonConstant.MENU_MODE.PLAYLIST;
          } else if ('demoDirective' === path) {

          }
        }

        function changeRoute(path) {

          $location.path('/'.concat(path));

          if ('songs' === path || '/' === path) {
            $scope.titleName = 'Songs';
            cacheMenu.currentMenu.name = commonConstant.MENU_MODE.SONG;
          }
          else if ('demoDirective' === path) {
            $scope.titleName = 'Demo Directive';
            cacheMenu.currentMenu.name = commonConstant.MENU_MODE.DEMO;
          }
        }

        function changeLang(lang) {
          i18next.changeLanguage(lang);
        }

        function changeShowSideBar() {
          vm.isShowSideBar = !vm.isShowSideBar;
        }

        function isSongMenu() {
          return cacheMenu.currentMenu.name === commonConstant.MENU_MODE.SONG;
        }

        function isEnLanguge() {
          return i18next.options.lng === commonConstant.LANG.EN;
        }

        function isPlaylistMenu() {
          return cacheMenu.currentMenu.name === commonConstant.MENU_MODE.PLAYLIST;
        }
      }])
  ;
})();
