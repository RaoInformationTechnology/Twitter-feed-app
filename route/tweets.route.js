const express = require('express');
const tweetsRoutes = express.Router();
const Twit = require('twit');
const trendsvalidation = require('../validation/trendsvalidation.js');
const tweetvalidation = require('../validation/tweetvalidation.js');
const searchtweetsvalidation = require('../validation/searchtweetsvalidation.js');
const ENV = require('dotenv');
ENV.config();

const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

/** Popular Twitter-trends */
tweetsRoutes.get('/twitter-trends', trendsvalidation.trends, (req, res) => {
    T.get('/trends/place', { name: '#Cricket', id: '1' }, function (err, response) {
        if (err) {
            console.log('err: ', err);
        } else {
            const trends = response[0].trends.splice(0, 5);
            res.status(200).json({ message: 'Fetched trends tweets', trends: trends })
        }
    })
});

/** Popular Twitter-tweets */
tweetsRoutes.get('/twitter-tweets', tweetvalidation.tweets, (req, res) => {
    T.get('/statuses/home_timeline', { count: 6 }, function (err, response) {
        if (err) {
            console.log('err: ', err);
        } else {
            res.status(200).send(response);
        }
    })
})

/** Popular Search-tweets */
tweetsRoutes.get('/search-tweets', searchtweetsvalidation.searchtweets, (req, res) => {
    const searchvalue = req.query.key;
    T.get('search/tweets', { q: searchvalue, count: 5 }, function (err, data, response) {
        if (err) {
            console.log('err: ', err);
        } else {
            const tweets = data.statuses;
            res.status(200).send(tweets);
        }
    });
})

module.exports = tweetsRoutes;