const ENV = require('dotenv');
ENV.config();

module.exports = {
    DB: process.env.DATABASE
}