const ENV = require('dotenv');
ENV.config();

/** Mongoose Database */
module.exports = {
    DB:'mongodb://localhost:27017/twitter-db'
}