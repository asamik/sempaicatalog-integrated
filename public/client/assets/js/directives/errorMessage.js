angular.module('application').directive('errorMessage', errorMessage);

errorMessage.$inject = ['UserSvc'];

function errorMessage(UserSvc) {
  return {
    restrict: "AE",
    templateUrl: "templates/errorMessage.html",
    scope: {
      type: "@",
    },
    controller: function($scope, $timeout) {
      'use strict';
      var errormessages = { 
        0: "Email address already in use",
        1: "そのメールアドレスは既に登録されています。",
        2: "Incorrect email or password",
        3: "メールアドレスまたはパスワードが一致しません。"
      }

      $scope.$on('error', function(event, error) {
        if ($scope.type === error.type) {
          if( error.data == "email is already in use") {
            if(!UserSvc.currentLanguage || (UserSvc.currentLanguage !== UserSvc.american)) {
              $scope.message = errormessages[0];
            } else  { 
              $scope.message = errormessages[1];
            }            
          } else {
            if(!UserSvc.currentLanguage || (UserSvc.currentLanguage !== UserSvc.american)) {
              $scope.message = errormessages[2];
            } else  { 
              $scope.message = errormessages[3];
            }
          }          
          $scope.hasError = true;
          $timeout(function() {
            $scope.hasError = false;
          }, 2500);
        }
      })
    }
  }
}
