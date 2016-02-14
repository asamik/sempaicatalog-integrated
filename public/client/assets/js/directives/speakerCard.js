angular.module('application').directive('speakerCard', speakerCard);

function speakerCard() {
  return {
    restrict: "AE",
    templateUrl: "templates/speakerCard.html",
    scope: {
      user: "@"
    },
    controller: function($scope, UserSvc, $state) {
      'use strict';
      $scope.data = JSON.parse($scope.user);
    }
  }
}
