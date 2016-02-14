(function() {
  'use strict';

  angular.module('application').controller('NavBarCtrl', NavBarCtrl);

  NavBarCtrl.$inject = ['$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller', '$localStorage', 'UserSvc'];

  function NavBarCtrl($cookies, $scope, $rootScope, $stateParams, $state, $controller, $localStorage, UserSvc) {
    
    $scope.$storage = $localStorage;
    $scope.uiRouterState = $state;

    $scope.currentlanguage = UserSvc.currentLanguage || UserSvc.japanese;

    $scope.switchLanguage = function() {
      console.log("UserSvc.currentLanguage CLICK!", UserSvc.currentLanguage);
			if ($scope.currentlanguage == UserSvc.japanese) {
		 		$scope.currentlanguage = UserSvc.american;
		 		UserSvc.currentLanguage = UserSvc.american;
      console.log("UserSvc.currentLanguage AFTER CLICK!", UserSvc.currentLanguage);
		 	} else {
        console.log("to JP")
		 		$scope.currentlanguage = UserSvc.japanese;
		 		UserSvc.currentLanguage = UserSvc.japanese;
      console.log("UserSvc.currentLanguage AFTER CLICK!", UserSvc.currentLanguage);

		 	}
    }

    $scope.inJapanese = function() {
    	if(!UserSvc.currentLanguage) {return false;}
			return UserSvc.currentLanguage !== UserSvc.japanese;
    }

    $scope.logout = function(){
      delete $scope.$storage.token;
      $state.go('home');
    }

///Move to app.js

    $rootScope.amILoggedIn = function() {
      return !!$scope.$storage.token;
    }

    $rootScope.amINotLoggedIn = function() {
      return (!$scope.$storage.token || ($scope.uiRouterState.current.name === "login"));
    }

    $rootScope.amIAdmin = function() {
      // var token = $window.sessionStorage.token;
    }
  }
})();
