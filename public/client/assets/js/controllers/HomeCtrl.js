(function() {
	'use strict';

	angular.module('application').controller('HomeCtrl', HomeCtrl);

	HomeCtrl.$inject = ['$timeout', 'FoundationApi', 'UserSvc', '$window',  '$cookies', '$scope', '$stateParams', '$state', '$controller', '$localStorage', '$rootScope', 'SweetAlertSvc'];

	function HomeCtrl($timeout, FoundationApi, UserSvc, $window, $cookies, $scope, $stateParams, $state, $controller, $localStorage, $rootScope, SweetAlertSvc) {

		angular.extend(this, $controller('DefaultController', {
			$scope: $scope,
			$stateParams: $stateParams,
			$state: $state,
			$localStorage: $localStorage
		}));

		$scope.inJapanese = function() {
			if(!UserSvc.currentLanguage) return false;
			return UserSvc.currentLanguage !== UserSvc.japanese;
		}

		$scope.loginUser = function() {
			UserSvc.login($scope.login)
			.then(function(resp, status, headers, config) {
				$scope.$storage.id =  resp.data.id;
				$scope.$storage.token = resp.data.token;
				$state.go('profile');
			})
			.catch(function(err) {
				console.log(err);
				delete $scope.$storage.token;
				err.type = 'loginError';
				$scope.$broadcast('error', err);
			});
		}

		$scope.$storage = $localStorage;

		$scope.signUpInProgress = false;

		$scope.proceedToSignup = function() {
			$scope.signUpInProgress = true;
			var email = $scope.email;
			var category = $scope.category

			UserSvc.checkEmail(email)
			.then(function(resp) {
				if(!UserSvc.currentLanguage) {
					SweetAlertSvc.american(category);
				} else {
					(UserSvc.currentLanguage !== UserSvc.japanese) ? SweetAlertSvc.japanese(category) :SweetAlertSvc.american(category)
				}
				$scope.$storage.email = email;
				if ($scope.category === 'sempai') {
					$state.go('speakerregister');
				} else {
					$state.go('signup');
				}
			})
			.catch(function(err){
        // email is taken
        $scope.signUpInProgress = false;        
        err.type = 'signupError';
        $scope.$broadcast('error', err);
      }) 
		}
	}
})();
