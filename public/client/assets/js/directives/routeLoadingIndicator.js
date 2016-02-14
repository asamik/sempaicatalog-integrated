angular.module('application').directive('routeLoadingIndicator', routeLoadingIndicator);

routeLoadingIndicator.$inject = ['$rootScope'];

function routeLoadingIndicator($rootScope) {
	return {
		restrict: 'E',
		template: "<h1 ng-if='isRouteLoading'> Loading...<h1>",
		link: function(scope) {
			scope.isRouteLoading = false;

			$rootScope.$on('$routeChangeStart', function() {
				scope.isRouteLoading = true;
			});

			$rootScope.$on('$routeChangeSuccess', function() {
				scope.isRouteLoading = false;
			});
		}
	};
};
