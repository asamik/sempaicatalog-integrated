(function() {
	'use strict';

	angular.module('application').controller('SpeakerRegisterCtrl', SpeakerRegisterCtrl);

	SpeakerRegisterCtrl.$inject = ['UserSvc', '$scope', '$stateParams', '$state', '$controller', '$http', '$localStorage', '$rootScope'];

	function SpeakerRegisterCtrl(UserSvc, $scope, $stateParams, $state, $controller, $http, $localStorage, $rootScope) {
		angular.extend(this, $controller('DefaultController', {
			$scope: $scope,
			$stateParams: $stateParams,
			$state: $state,
			$localStorage: $localStorage
		}));

		$scope.$storage = $localStorage;

		$scope.speakerImage = function(){
			return $scope.speakerpic ? 'data:image/jpeg;base64,' + $scope.speakerpic.base64 : "http://placehold.it/250x200";
		}

    $scope.inJapanese = function() {
    	if(!UserSvc.currentLanguage) {return false;}
			return UserSvc.currentLanguage !== UserSvc.japanese;
    }

    $scope.isPicSizeAlright = function() {
      var pic = $scope.speakerpic.base64;
      var imageSizeLimit = 2000000;
      var byteChars = atob(pic);
      var byteNumbers = new Array(byteChars.length);

      for (var i = 0; i < byteChars.length; i++) {
          byteNumbers[i] = byteChars.charCodeAt(i);
      }
      console.log("scope pic", byteNumbers.length)
      if(byteNumbers.length >= imageSizeLimit) {
         $scope.pic = "";
        return console.log("Image size too big");
      }
        return console.log("Image size okay");
    }

		$scope.registerInProgress = false;

		$scope.allDone = function(speaker, speakerDetail){
			$scope.registerInProgress = true;

			var newSpeaker = {
				name: speaker.name,
				organization: speaker.organization,
				position: speaker.position,
        region: speaker.region,
				password: speaker.password,
				password2: speaker.confirmpassword,
				email: $scope.$storage.email
      }

			UserSvc.register(newSpeaker)
			.then(function(resp){
				$scope.$storage.id =  resp.data.id
				$rootScope.id =  resp.data.id
				$scope.$storage.token = resp.data.token;
				$rootScope.token = resp.data.token;

				var newSpeakerDetail = {
					id: $scope.$storage.id,
          profilePic: 'data:image/jpeg;base64,' + $scope.speakerpic.base64,
					expertise: speakerDetail.expertise,
					fee: speakerDetail.fee,
					topics: speakerDetail.topics,
					header: speakerDetail.header,
					selfintroduction: speakerDetail.selfintroduction,
					background: speakerDetail.background
				}

				UserSvc.registerspeaker(newSpeakerDetail)
				.then(function(resp){
					$state.go('profile');
				})
				.catch(function(error){
					$scope.registerInProgress = false;
				})
			})
			.catch(function(error){
				$scope.registerInProgress = false;      	
			})      
		}

		$scope.validate = function(){
			return $scope.speaker && $scope.speaker.name && $scope.speaker.password && $scope.speaker.organization && $scope.speaker.position && $scope.speaker.region && ($scope.speaker.password === $scope.speaker.confirmpassword) && $scope.speakerpic && $scope.speakerDetail && $scope.speakerDetail.fee && $scope.speakerDetail.header
		}    
	}
})();
