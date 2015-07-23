'use strict';

var angular = require('angular');
var _ = require('lodash');

angular.module('app', ['start']);

require('./components/LoginService')(angular);
require('./components/LoginController')(angular);
require('./components/ProfileController')(angular);
require('./components/TwitterService')(angular);
require('./components/TimelineController')(angular);
require('./components/TimeAgoFilter')(angular);

angular.module('start', [])
    .run(function(LoginService) {
        LoginService.getUser();
    });
