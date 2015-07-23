'use strict';

var moment = require('moment');

moment.createFromInputFallback = function(config) {
    // unreliable string magic, or
    config._d = new Date(config._i);
};

module.exports = function(angular) {
    angular.module('app').filter('timeAgo', function () {
        return function (input) {
            return moment(input).fromNow();
        };
    });
};


