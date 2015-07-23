'use strict';
var _          = require('lodash');
var router     = require('koa-router')();
var twitterAPI = require('node-twitter-api');
var Promise    = Promise || require('bluebird');
var defer      = require('promise-defer').bind(null, Promise);

module.exports = function(config) {

	var twitter = new twitterAPI({
		consumerKey   : config.auth.twitter.key,
		consumerSecret: config.auth.twitter.secret
	});

	return {
		getTimeline: function(userData) {

			var deferred = defer();

			twitter.getTimeline('home',
				{},
                userData.token,
                userData.secret,
				function(error, data) {
					if (error) { deferred.reject(error); }
					else { deferred.resolve(data); }
				}
			);

			return deferred.promise;
		},

		postStatus: function(userData) {

			var deferred = defer();

			twitter.getTimeline('home',
				{},
                userData.token,
                userData.secret,
				function(error, data) {
					if (error) { deferred.reject(error); }
					else { deferred.resolve(data); }
				}
			);

			return deferred.promise;
		}
	};
};
