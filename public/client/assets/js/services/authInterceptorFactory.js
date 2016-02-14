(function() {
  'use strict';

  angular.module('application').factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', '$window'];

  function authInterceptor($rootScope, $q, $window) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($rootScope.token) {
          config.headers.Authorization = 'Bearer ' + $rootScope.token;
        }
        return config;
      },
      response: function (response) {
        if (response.status === 401) {
          console.log('user not authenticated')
        }
        return response || $q.when(response);
      }
    };
  };
})();
