const mongoose = require('mongoose');
const passport = require('passport');
const Joi = require('joi');
const express = require('express');
const validator = require('express-joi-validation')({});
const app     = express();
const http = require('http').Server(app);
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');
const twitterConfig = require('./config.js');
const  userController = require('./controller/user.controller');
const trendsvalidation = require('./validation/trendsvalidation.js');
const tweetvalidation = require('./validation/tweetvalidation.js');
const searchtweetsvalidation = require('./validation/searchtweetsvalidation.js');
const hashtagvalidation = require('./validation/hashtagvalidation.js');
const uservalidation = require('./validation/uservalidation.js');
const userModel = require('./model/user.model');
const Twit = require('twit');
require('dotenv').config({ path: '../../.env' });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());



mongoose.connect('mongodb://localhost:27017/twitter-db',{ useNewUrlParser: true } );

const T = new Twit({
  consumer_key:         'z8GSoJgB7Zbj05sWcxW87Zi1L',
  consumer_secret:      '6F6quJ491qYCkhs2jG2uZaJWvrkjBaOElKuQ6fBzSYzRGs3bkn',
  access_token:         '1125979094783414272-NeCbbT2Vrc1xLzMOcKEpxWBAUA302f',
  access_token_secret:  'jIbogQP0R69uQLHxfMKXqoRmjDGViN1NVRjrLXASOwfUz'
})

const passportConfig = require('./passport');
passportConfig();



const createToken = function(auth) {
  return jwt.sign({
    id: auth.id
  }, 'my-secret',
  {
    expiresIn: 60 * 120
  });
};

const generateToken = function (req, res, next) {
  req.token = createToken(req.auth);
  return next();
};

const sendToken = function (req, res) {
  res.setHeader('x-auth-token', req.token);
  return res.status(200).send(JSON.stringify(req.user));
};



router.route('/auth/twitter/reverse')
.post(uservalidation.reverseuserdata,function(req, res) {
  request.post({
    url: 'https://api.twitter.com/oauth/request_token',
    oauth: {
      oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
      consumer_key: twitterConfig.consumerKey,
      consumer_secret: twitterConfig.consumerSecret
    }
  }, function (err, r, body) {
    if (err) {
      return res.send(500, { message: err.message });
    }


    const jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
    res.send(JSON.parse(jsonStr));
  });
});



router.route('/auth/twitter')
.post(uservalidation.userdata,(req, res, next) => {
  console.log("twitter-1=========")
  request.post({
    url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
    oauth: {
      consumer_key: twitterConfig.consumerKey,
      consumer_secret: twitterConfig.consumerSecret,
      token: req.query.oauth_token
    },
    form: { oauth_verifier: req.query.oauth_verifier }
  }, function (err, r, body) {
    console.log("twitter-2=========")
    if (err) {
      return res.send(500, { message: err.message });
    }

    const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
    console.log("bodystring========",bodyString);
    const parsedBody = JSON.parse(bodyString);
    console.log("parsedbody========",parsedBody);

    req.body['oauth_token'] = parsedBody.oauth_token;
    req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
    req.body['user_id'] = parsedBody.user_id;
    req.body['screen_name'] = parsedBody.screen_name;
    req.body['username'] = parsedBody.username;

    next();
  });
}, passport.authenticate('twitter-token', {session: false}), function(req, res, next) {

  if (!req.user) {
    return res.send(401, 'User Not Authenticated');
  }

  // prepare token for API
  req.auth = {
    id: req.user.id
  };

  return next();
}, generateToken, sendToken);

//token handling middleware
const authenticate = expressJwt({
  secret: 'my-secret',
  requestProperty: 'auth',
  getToken: function(req) {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
});

const getCurrentUser = function(req, res, next) {
  userModel.findById(req.auth.id, function(err, user) {
    if (err) {
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
};

const getOne = function (req, res) {
  const user = req.user.toObject();

  delete user['twitterProvider'];
  delete user['__v'];

  res.json(user);
};



app.get('/twitter-trends',trendsvalidation.trends,(req, res) => {
 
  T.get('/trends/place',{name:'#Cricket', id:'1'},function(err,response){
    if (err) {
      console.log('err: ', err);
    } else {
      const trends = response[0].trends.splice(0,5);
      res.status(200).json({message: 'Fetched trends tweets', trends: trends})
    }
  })

});

app.get('/twitter-tweets',tweetvalidation.tweets,(req,res) => {

  T.get('/statuses/home_timeline', {count:6},function(err,response){
    if (err) {
      console.log('err: ', err);
    } else {
      console.log("response=====",response);
      res.status(200).send(response);
    }

  })
})

app.get('/search-tweets',searchtweetsvalidation.searchtweets,(req,res) =>{
  console.log('tweets search car',req.query);
  const searchvalue = req.query.key;
  console.log("query===",searchvalue);

  T.get('search/tweets', {q:searchvalue,count: 5 }, function(err, data, response) {
    const tweets = data.statuses;
    for(var i=0;i<tweets.length;i++){
      console.log(tweets[i].text);

    }
    res.status(200).send(tweets);
  });
})


router.route('/auth/me')
.get(authenticate, getCurrentUser, getOne);
app.use('/api/v1', router);
app.post('/user/addtag',[hashtagvalidation.addhashtag],userController.addtag);
app.delete('/user/deletehashtag',[hashtagvalidation.deletehashtag],userController.deletehashtag);
app.put('/user/updatehashtag',userController.updatehashtag);
app.get('/user/gethashtag/:email',[hashtagvalidation.getHashTag],userController.getHashTag);
app.listen(4000);

module.exports = app;