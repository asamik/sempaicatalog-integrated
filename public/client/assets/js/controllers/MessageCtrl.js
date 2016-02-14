(function() {
  'use strict';

  angular.module('application').controller('MessageCtrl', MessageCtrl);

  MessageCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller', '$localStorage', 'MessageSvc'];

  function MessageCtrl(UserSvc, $cookies, $scope, $rootScope, $stateParams, $state, $controller, $localStorage, MessageSvc) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));
    
    if (!$rootScope.amILoggedIn()) {
      return $state.go('home');
    }
    $scope.$storage = $localStorage;

    var userId = $scope.$storage.id;
    $rootScope.id = userId;
    $rootScope.token = $scope.$storage.token;

    $scope.allMessages = [];

    MessageSvc.loadAllMessages()
    .then(function(resp) {
      $scope.allMessages = resp.data;
      
    })
    .catch(function(err) {
      console.log(err);
    })

  }
})();
