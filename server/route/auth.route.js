const passport = require('passport');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const request = require('request');
const twitterConfig = require('../config.js');
const uservalidation = require('../validation/uservalidation.js');
const passportConfig = require('../passport');
passportConfig();
const ENV = require('dotenv');
ENV.config();

const createToken = function (auth) {
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
.post(uservalidation.reverseuserdata, function (req, res) {
    console.log("---------------------------->>>>>>>>>>>>REVERSE");
        request.post({
            url: process.env.AUTH,
            oauth: {
                oauth_callback: process.env.OAUTH_CALLBACK_URL,
                consumer_key: twitterConfig.CONSUMER_KEY,
                consumer_secret: twitterConfig.CONSUMER_SECRET
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
    .post(uservalidation.userdata, (req, res, next) => {
        console.log("---------------------------->>>>>>>>>>>>");
        request.post({
            url: process.env.AUTH_URL,
            oauth: {
                consumer_key: twitterConfig.consumer_key,
                consumer_secret: twitterConfig.consumer_secret,
                token: req.query.oauth_token
            },
            form: { oauth_verifier: req.query.oauth_verifier }
        }, function (err, r, body) {
            if (err) {
                return res.send(500, { message: err.message });
            }
            const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
            const parsedBody = JSON.parse(bodyString);
            req.body['oauth_token'] = parsedBody.oauth_token;
            req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
            req.body['user_id'] = parsedBody.user_id;
            req.body['screen_name'] = parsedBody.screen_name;
            req.body['username'] = parsedBody.username;
            next();
        });
    }, passport.authenticate('twitter-token', { session: false }), function (req, res, next) {
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
    getToken: function (req) {
        if (req.headers['x-auth-token']) {
            return req.headers['x-auth-token'];
        }
        return null;
    }
});

const getCurrentUser = function (req, res, next) {
    userModel.findById(req.auth.id, function (err, user) {
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

router.route('/auth/me').get(authenticate, getCurrentUser, getOne);

module.exports = router;