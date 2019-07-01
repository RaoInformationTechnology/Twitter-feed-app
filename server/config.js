const ENV = require('dotenv');
ENV.config();

module.exports = {
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token: process.env.ACCESS_TOKEN,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
	callbackURL: 'http://132.140.160.63:4000/auth/twitter/callback',
}