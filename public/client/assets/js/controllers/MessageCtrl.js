(function() {
  'use strict';

  angular.module('application').controller('MessageCtrl', MessageCtrl);

  MessageCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller', '$localStorage', 'MessageSvc', '$location', '$anchorScroll', '$filter'];

  function MessageCtrl(UserSvc, $cookies, $scope, $rootScope, $stateParams, $state, $controller, $localStorage, MessageSvc, $location, $anchorScroll, $filter) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state
    }));
    
    if (!$rootScope.amILoggedIn()) {
      return $state.go('home');
    }
    $scope.$storage = $localStorage;

    $location.hash('bottom');
    $anchorScroll();
    
    var userId = $scope.$storage.id;
    $rootScope.id = userId;
    $rootScope.token = $scope.$storage.token;
    $scope.userId = userId;

    $scope.allMessages = [];

    MessageSvc.loadAllMessages()
    .then(function(resp) {
      var allMessages = resp.data;

      $scope.allMessages = allMessages;
    })
    .catch(function(err) {
      console.log(err)
    })

    $scope.sendMessage = function(message) {
      console.log("message.content", message.content);

      // MessageSvc.sendMessages();
      // .then(function(resp) {
      //   console.log(resp.data);
      // })
      // .catch(function(err) {
      //   console.log(err);
      // })
    }
  }
})();
