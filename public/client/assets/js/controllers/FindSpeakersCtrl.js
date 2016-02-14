(function() {
	'use strict';

	angular.module('application').controller('FindSpeakersCtrl', FindSpeakersCtrl);

	FindSpeakersCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller', '$localStorage'];

	function FindSpeakersCtrl(UserSvc, $cookies, $scope, $rootScope, $stateParams, $state, $controller, $localStorage) {
		angular.extend(this, $controller('DefaultController', {
			$scope: $scope,
			$stateParams: $stateParams,
			$state: $state
		}));
		
		if (!$rootScope.amILoggedIn()) {
			return $state.go('home');
		}
		$scope.$storage = $localStorage;

		var userId = $scope.$storage.id;
		$rootScope.id = userId;
		$rootScope.token = $scope.$storage.token;

		$scope.inJapanese = function() {
			if(!UserSvc.currentLanguage) return false;
			return UserSvc.currentLanguage !== UserSvc.japanese;
		}

    $scope.allSpeakers = [];
    UserSvc.getAllSpeakers()
    .then(function(resp) {
    	$scope.allSpeakers = resp.data
    });
  }
})();
