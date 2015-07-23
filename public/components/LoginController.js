"use strict";

module.exports = function(angular) {
	angular.module('app').controller('LoginController', function($scope, $window, LoginService) {

		// holds login status messages for diagnostic purposes.
		$scope.status = false;
        $scope.loggedIn = false;

		var messageEventListener = LoginService.handleLoginPostMessage($scope);
		$window.addEventListener('message', messageEventListener);

		$scope.login = function(strategy) {
			$scope.status = 'Requesting token...';
			LoginService.login(strategy)
				.then(function(){ $scope.status = false; })
				.catch(function(error) { $scope.status = error; });
		};

        $scope.$on('logIn', function(event, user) {
            $scope.loggedIn = true;
        });
	});
};
