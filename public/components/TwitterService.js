"use strict";

module.exports = function(angular) {
    angular.module('app').factory('TwitterService', function($http) {
        return  {
            getTimeline: function() {
                return $http.get('/timeline');
            },

            postStatus: function(status) {
                return $http.post('/timeline', {
                    text: status
                });
            }
        };
    });
};
