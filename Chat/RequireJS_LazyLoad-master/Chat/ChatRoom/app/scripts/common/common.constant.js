angular.module('chat.app')
  .constant('commonConstant', {
    HTTP: {
      METHOD: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
      },
      CONTENT_TYPE: {
        JSON: {
          'Content-Type': 'application/json'
        }
      }
    },
    /*** API ***/
    API: {
      AUTH: {
        REGISTER: 'api/register',
        LOGIN: 'api/authenticate',
        PROFILE: 'api/profile'
      }
    },
    LANG: {
      EN: 'en',
      VI: 'vi'
    }
  });
