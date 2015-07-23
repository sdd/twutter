'use strict';

var config = require('config-layered')();
var koa = require('koa');
var jwt = require('koa-jwt');
var session = require('koa-session');
var send = require('koa-send');
var mount = require('koa-mount');

var seneca = require('seneca')();
seneca.use('seneca-bluebird');

// start the auth and user microservices in-process
var authHandler = require('alt-auth-seneca')(config, seneca);
var userHandler = require('alt-user-seneca')(config, seneca);

var app = koa();
app.keys = config.koa.keys;
app.use(session(app));

app.use(jwt(config.jwt).unless({ path: [/^\/($|public|auth|connect|.*woff2$)/] }));

app.use(mount('/public', require('koa-static')('public')));

app.use(authHandler.koa());
app.use(userHandler.koa());

app.use(require('./twitter-routes')(config, seneca));

app.use(function *() {
	if (this.path == '/') yield send(this, __dirname + '/public/index.html');
    if (this.path.split('.').reverse()[0] == 'woff2') yield send(this, __dirname + '/public' + this.path);
});

require('./auto-serve-ssl')(app.callback(), config);
