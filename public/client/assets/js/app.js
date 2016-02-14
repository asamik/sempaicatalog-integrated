(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'naif.base64',
    'ngStorage',
    'ngRoute',

    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
    ])
  .config(config)
  .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider', '$routeProvider'];

  function config($urlProvider, $locationProvider, $httpProvider, $routeProvider) {
    $urlProvider.otherwise("/");
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $locationProvider.hashPrefix('!');
    $httpProvider.interceptors.push('authInterceptor');
  }

  function run() {
    FastClick.attach(document.body);
  }
})();
