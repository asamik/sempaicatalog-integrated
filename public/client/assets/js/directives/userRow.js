angular.module('application').directive('userRow', userRow);

function userRow() {
  return {
    restrict: "A",
    templateUrl: "templates/userRow.html",
    scope: {
      data: "@"
    },
    controller: function(AdminSvc, $scope, $http) {
      'use strict';
      $scope.user = JSON.parse($scope.data);
      $scope.updatedUser = JSON.parse($scope.data);

      function populateUsers() {
        $scope.$emit('populateUsers');
      }

      $scope.makeAdmin = function(user){
        AdminSvc.makeAdmin(user)
          .then(function(res) {
          populateUsers();
          console.log('Updated to admin successfully', res);
        }).catch(function(err) {
          console.error(err);
        })
      }

      $scope.removeUser = function(user) {
        AdminSvc.removeUser(user)
          .then(function(res) {
            populateUsers();
            console.log('deleted user');
          })
          .catch(function(err) {
            console.log('err', err);
          });
      }

      $scope.editUser = function() {
        AdminSvc.editUser($scope.updatedUser)
          .then(function(res) {
            populateUsers();
            console.log('updated user');
          })
          .catch(function(err) {
            console.log('err', err);
          });
      }
    }
  };
}
