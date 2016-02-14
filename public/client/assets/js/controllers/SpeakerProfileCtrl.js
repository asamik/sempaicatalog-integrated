(function() {
	'use strict';

	angular.module('application').controller('SpeakerProfileCtrl', SpeakerProfileCtrl);

	SpeakerProfileCtrl.$inject = ['UserSvc', '$cookies', '$scope', '$rootScope', '$stateParams', '$state', '$controller', '$http'];

	function SpeakerProfileCtrl(UserSvc, $cookies, $scope, $rootScope, $stateParams, $state, $controller, $http) {
		'use strict';
		if (!$rootScope.amILoggedIn()) {
			return $state.go('home');
		}
		
		$scope.inJapanese = function() {
			if(!UserSvc.currentLanguage) {return false};
			return UserSvc.currentLanguage !== UserSvc.japanese;
		}

		UserSvc.getSpeakerInfo($stateParams.speakerId)
		.then(function(resp) {
			$scope.isSpeaker = function() {return resp.data.speaker}
			$scope.speaker = resp.data;
		})
		.catch(function(err) {
			console.log(err);
		});
	}
})();
