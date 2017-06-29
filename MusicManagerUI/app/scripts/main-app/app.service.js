/**
 * Created by hoang yen on 26/03/2017.
 */
(function () {
  'use strict';
  angular.module('songApp')
    .factory('appService', ['$http', '$location', 'commonConstant', function ($http, $location, commonConstant) {

      var cache =
        {
          currentMenu: {
            name: commonConstant.MENU_MODE.SONG
          }
        };
      return {
        cache: cache
      };
    }]);
})();
