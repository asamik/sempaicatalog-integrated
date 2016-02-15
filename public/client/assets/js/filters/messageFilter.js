(function() {
  'use strict';

angular.module('application').filter('messageFilter', messageFilter);

messageFilter.$inject = ['$rootScope'];
  var filteredId = [];
  var filtered = [];

  function messageFilter($rootScope) {
    return function(messages) {
      var userId = $rootScope.id;
      
      messages.forEach((message) => {
        if (((message.to._id === userId)  ||  (message.from._id === userId)) && 
          ((filteredId.indexOf(message.to._id) === -1 && filteredId.indexOf(message.from._id) === -1))) {
          if(message.to._id === userId) {
            filteredId.push(message.from._id);
            filtered.push({
              id: message.from._id,
              name: message.from.name
            });
          } else {
            filteredId.push(message.to._id);
            filtered.push({
              id: message.to._id,
              name: message.to.name
            });
          }
        }
      });
      return filtered;
    };
  };
})();
