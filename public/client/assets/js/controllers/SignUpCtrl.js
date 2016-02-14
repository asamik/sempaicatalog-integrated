(function() {
  'use strict';

  angular.module('application').controller('SignUpCtrl', SignUpCtrl);

  SignUpCtrl.$inject = ['UserSvc', '$scope', '$window', '$stateParams', '$state', '$controller', '$http', '$localStorage', '$rootScope'];

  function SignUpCtrl(UserSvc, $scope, $window, $stateParams, $state, $controller, $http, $localStorage, $rootScope) {
    angular.extend(this, $controller('DefaultController', {
      $scope: $scope,
      $stateParams: $stateParams,
      $state: $state,
      $localStorage: $localStorage
    }));

    $scope.$storage = $localStorage;

    $scope.inJapanese = function() {
    	if(!UserSvc.currentLanguage) {return false;}
			return UserSvc.currentLanguage !== UserSvc.japanese;
    }

    $scope.signUpProgress = false;

    $scope.allDone = function(user){
	    $scope.signUpProgress = true;	
      var newUser = {
        name: user.name,
        organization: user.organization,
        position: user.position,
        region: user.region,
        password: user.password,
        password2: user.confirmpassword,
        email: $scope.$storage.email
      }

      UserSvc.register(newUser)
      .then(function(resp){
        $scope.$storage.id =  resp.data.id
        $rootScope.id =  resp.data.id
        $scope.$storage.token = resp.data.token;
        $rootScope.token = resp.data.token;
        $state.go('profile');
      })
      .catch(function(error){
        delete $scope.$storage.token;
        console.log("error:", error)
        $state.go('home');
      })
    }

    $scope.validateUserInput = function(){
      return $scope.user && $scope.user.name && $scope.user.password && $scope.user.organization && $scope.user.position && $scope.user.region　&& ($scope.user.password === $scope.user.confirmpassword);
    }
  }
})();
