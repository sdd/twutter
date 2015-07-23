"use strict";

module.exports = function(angular) {
	angular.module('app').factory('LoginService', function($rootScope, $log, $q, $window, $http) {

		// this is a data URI that is used so that the popup window used for twitter
		// login is styled nicely before it's request is made, and also helps
		// prevent popup blocking.
		var waitDataURI = "data:text/html;base64,PGh0bWw+PGJvZHk+PGgxIHN0eWxlPSJmb250LWZhbWlseTpoZWx2ZXRpY2E7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6I2FhYTtmb250LXNpemU6MTRweDsiPlBsZWFzZSBXYWl0Li4uPC9oMT48L2JvZHk+PC9odG1sPg==";

		var getUser = function() {
			return $http.get('/user/current')
				.success(function(data) {
					if (data.success) {
						$rootScope.user = data.user.Logins[0];
					} else {
						$log.error('User data request failed');
						$rootScope.user = null;
					}
					$rootScope.$broadcast('logIn', $rootScope.user);
				})
				.error(function(data, status) {
					if (status !== 401) {
						$log.error('Could not retrieve user data');
					}
					$rootScope.user = null;
				});
		};

		return {
			getUser: getUser,

			login: function(strategy) {
				var deferred = $q.defer();

				var popupReference = $window.open(
					waitDataURI,
					strategy + '_login',
					"width=800,height=400,resizable,scrollbars=yes,status=1"
				);

				$http.get('/auth/' + strategy)
					.success(function(data, status, headers, config) {
						if (data.success) {
							if (data.result === 'redirect') {
								popupReference.location.href = data.url;
								deferred.resolve();
							}
						} else {
							deferred.reject('Login failed.');
						}
					})
					.error(function(data, status, headers, config) {
						popupReference.close();
						deferred.reject('Login failed ' + (status ? status : '') + ' ' + data);
					});

				return deferred.promise;
			},

			handleLoginPostMessage: function($scope) {
				return function(event) {
					$scope.$apply(function() {
						if (event.origin !== window.location.origin) {
							$scope.status = 'ERROR: bad postMessage origin, ' + event.origin;
						} else {
							if (event.data === 'authTokenSet') {
								$scope.status       = false;

								getUser();

							} else if (event.data === 'authTokenFailed') {
								$scope.status       = 'Login failed.';
								$rootScope.loggedIn = false;
							} else {
								$scope.status       = 'ERROR: Unknown postMessage: ' + event.data;
								$rootScope.loggedIn = false;
							}
							$scope.popupRef && $scope.popupRef.close && $scope.popupRef.close();
						}
					});
				}
			}
		};
	});
};
