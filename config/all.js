module.exports = {
	port: 8443,

	koa: {
		keys: ['secrets']
	},

	jwt:{
		secret: process.env.JWT_KEY,
		cookie: 'jwt',
		key: 'jwt'
	},

	ssl: {
		privateKeyFile: 'privatekey.pem',
		certificateKeyFile: 'certificate.pem',
		days: 7
	},

	auth: {
		autoLogin: true,

		twitter: {
			key   : process.env.TWITTER_KEY,
			secret: process.env.TWITTER_SECRET
		},

		common : {
			urlhost: "https://localhost:8443"
		},
		expiry: 60 // minutes
	}

}
