(function() {
  'use strict';

  angular.module('application').controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['UserSvc', '$scope', '$window', '$rootScope', '$stateParams', '$state', '$controller', '$http', '$localStorage', 'SweetAlertSvc'];

  function ProfileCtrl(UserSvc, $scope, $window, $rootScope, $stateParams, $state, $controller, $http, $localStorage, SweetAlertSvc) {
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
    
    function getUserInfo() {
      UserSvc.getUserInfo(userId)
      .then(function(res) {
            console.log("res.data", res.data);
        if(res.data.speaker === true) {
          UserSvc.getSpeakerInfo(userId)
          .then(function(resp) {
            $scope.user = res.data;
            $scope.isSpeaker = function() {
              return $scope.user.speaker = true;
            }
            $scope.speakerDetail = resp.data;
          })
        } else {
        $scope.user = res.data;
        }
      })
      .catch(function(err) {
        console.log(err);
      });
    }
    getUserInfo();

    $scope.initializeModal = function() {
      $scope.updateduser = JSON.parse(JSON.stringify($scope.user)); 
      $scope.updatedspeakerDetail = $scope.speakerDetail;     
    }

    $scope.saveChanges = function() {
      if (!$scope.updateduser || !$scope.updateduser.organization || !$scope.updateduser.position || !$scope.updateduser.region) {
        if(!UserSvc.currentLanguage || UserSvc.currentLanguage !== UserSvc.japanese) {
          return SweetAlertSvc.noBlankEditEN();
        } else {
          return SweetAlertSvc.noBlankEditJP();
        }
      }    
      UserSvc.updateUser($scope.updateduser)
      .then(function(res) {
        $scope.user = $scope.updateduser;
        if (res.data.speaker === true) {
          UserSvc.updateSpeakerDetail($scope.updatedspeakerDetail, res.data._id)
          .then(function(resp) {
            getUserInfo();
          })
          .catch(function(err) {
            console.log('err', err);
          });
        }
      })
      .catch(function(err) {
        console.log('err', err);
      });
    }
  }
})();
