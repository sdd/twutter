'use strict';
var _          = require('lodash');
var router     = require('koa-router')();

module.exports = function(config, seneca) {

	var twitterAPI = require('./twitter-api')(config);

	var createUserMiddleware = function(action) {
		return function *() {
			if (_.get(this, 'state.jwt.sub')) {
				var response = yield seneca.actAsync({
					system: 'user',
					action: 'get',
					id    : this.state.jwt.sub
				});

				if (response.success) {
					this.body = yield action.call(this, response.user.Logins[0]);
				} else {
					this.status = 500;
				}
			} else {
				this.status = 401;
			}
		};
	};

	router.get('/timeline', createUserMiddleware(function(userData) {
		return twitterAPI.getTimeline(userData);
	}));

	router.post('/status', createUserMiddleware(function(userData) {
		return twitterAPI.postStatus(userData, this.body.status);
	}));

	return router.middleware();
};
