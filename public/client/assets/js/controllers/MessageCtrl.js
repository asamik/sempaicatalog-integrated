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
    
    var allMessages;
    var selectedPersonId;
  
    $location.hash('bottom');
    $anchorScroll();

    var userId = $scope.$storage.id;
    $rootScope.id = userId;
    $rootScope.token = $scope.$storage.token;
    $scope.userId = userId;

    $scope.allMessages = [];

  $scope.loadPersonalMessage = function(id) {
    console.log("message id", id)

    var filteredMessages = allMessages.filter ((message) => {
    return (message.to._id === id) || (message.from._id === id)
    });
    
    console.log("selectedPersonId", selectedPersonId);
    selectedPersonId = id;
    $scope.allMessages = filteredMessages;
  }

//load all messages with userid in filtered and userId in rootscope
    MessageSvc.loadAllMessages()
    .then(function(resp) {
      allMessages = resp.data;
      $scope.listOfMessages = allMessages;
    
      loadSelectedMessages(allMessages[allMessages.length - 1]);
    })
    .catch(function(err) {
      console.log(err)
    })

  function loadSelectedMessages(selectedId) {
    if (selectedId.to._id === userId) {
      selectedPersonId = selectedId.from._id; 
    } else {
      selectedPersonId = selectedId.to._id;
    }

    var filteredMessages = allMessages.filter ((message) => {
      return (message.to._id === selectedPersonId) || (message.from._id === selectedPersonId)
    });

    console.log("selectedPersonId", selectedPersonId);
    $scope.allMessages = filteredMessages;
  }



    // $scope.sendMessage = function(newmessage) {
    //   console.log("message.content", message.content);
    //   MessageSvc.sendMessages();
    //   .then(function(resp) {
    //     console.log(resp.data);
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   })
    // }
  }
})();
