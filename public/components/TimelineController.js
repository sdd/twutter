"use strict";

module.exports = function(angular) {
    angular.module('app').controller('TimelineController', function($scope, $rootScope, TwitterService) {

        $scope.refreshTimeline = function() {
            TwitterService.getTimeline()
                .then(function(timeline) {
                    $scope.timeline = timeline.data;
                });
        };

        $scope.$on('logIn', function(event, user) {
            $scope.refreshTimeline();
        });
    });
};
