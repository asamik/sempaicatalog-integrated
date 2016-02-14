(function() {
  'use strict';

  angular.module('application').controller('MessageCtrl', MessageCtrl);

  MessageCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller', '$localStorage'];

  function MessageCtrl(UserSvc, $cookies, $scope, $rootScope, $stateParams, $state, $controller, $localStorage) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));
  
  }
})();
