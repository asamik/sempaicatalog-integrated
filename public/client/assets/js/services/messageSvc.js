(function() {
  'use strict';

  angular.module('application').service('MessageSvc', MessageSvc);

  MessageSvc.$inject = ['$http'];

  function MessageSvc($http) {
    var url = "http://localhost:3000";
    // var url = 'https://lit-hamlet-87436.herokuapp.com';

  this.loadAllMessages = function() {
    return $http.get(url + '/messages');
  }
  }
})();
