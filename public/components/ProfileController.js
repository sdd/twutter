"use strict";

module.exports = function(angular) {
	angular.module('app').controller('ProfileController', function($scope) {

		$scope.profile = null;

		$scope.$on('logIn', function(event, user) {
            $scope.profile = user;
            console.log($scope);
		});

		$scope.getProfileImage = function(sizeName) {
			sizeName = sizeName || 'normal';
			return $scope.profile &&
					$scope.profile._json.profile_image_url_https.replace('normal', sizeName);
		}
	});
};
