angular.module('songApp')
  .constant('commonConstant', {
    /*** Mode display of page ***/
    MENU_MODE: {
      SONG: 'SONG',
      PLAYLIST: 'PLAYLIST',
      DEMO: 'DEMO'
    },
    /*** Mode display of page ***/
    VIEW_MODE: {
      SHOW: 'SHOW',
      ADD: 'ADD',
      EDIT: 'EDIT'
    },
    /*** Mode display of tab ***/
    SHOW_TAB: {
      INFORMATION: 'INFORMATION',
      ADDSONG: 'ADDSONG'
    },
    /*** HTTP method ***/
    HTTP_METHOD: {
      GET: 'GET',
      POST: 'POST',
      PUT: 'PUT',
      DELETE: 'DELETE'
    },
    /*** API ***/
    API: {
      PLAYLIST: 'api/playlist',
      SONG: 'api/song'
    },
    LANG: {
      EN: 'en',
      VI: 'vi'
    }
  });
