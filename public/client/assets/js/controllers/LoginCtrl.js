(function() {
  'use strict';

  angular.module('application').controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$timeout', 'FoundationApi', 'UserSvc', '$window',  '$cookies', '$scope', '$stateParams', '$state', '$controller', '$localStorage', '$rootScope'];

  function LoginCtrl($timeout, FoundationApi, UserSvc, $window, $cookies, $scope, $stateParams, $state, $controller, $localStorage, $rootScope) {

    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state,
      $localStorage: $localStorage
    }));

    $scope.inJapanese = function() {
    	if(!UserSvc.currentLanguage) {return false;}
			return UserSvc.currentLanguage !== UserSvc.japanese;
    }

    $scope.welcome = "Log In";

    $scope.$storage = $localStorage;

    $scope.logInProgress = false;

    $scope.loginUser = function() {
		  $scope.logInProgress = true;
      UserSvc.login($scope.login)
      .then(function(resp, status, headers, config) {
        $scope.$storage.id =  resp.data.id;
        $scope.$storage.token = resp.data.token;
        $state.go('profile');
      })
      .catch(function(err) {
        console.log(err);
        delete $scope.$storage.token;
		    $scope.logInProgress = false;        
        err.type = 'loginError';
        $scope.$broadcast('error', err);
      });
    }
  }
})();    