const passport = require('passport');
TwitterTokenStrategy = require('passport-twitter-token');
const User = require('./model/user.model');
twitterConfig = require('./config.js');
const ENV = require('dotenv');
ENV.config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;


module.exports = function () {

  passport.use(new TwitterTokenStrategy({
    consumerKey: twitterConfig.consumer_key,
    consumerSecret: twitterConfig.consumer_secret,
    includeEmail: true
  },
    (token, tokenSecret, profile, res) => {
      User.findOne({
        'twitterProvider.id': profile.id,
        'email': profile.emails[0].value
      }, function (err, user) {
        //user already found
        if (user) {
          const email = profile.emails[0].value;
          const payload = { email };
          const token = jwt.sign(payload, secret, { expiresIn: '1h' });
          const userData = {
            user: user,
            token: token
          }
          return res(err, userData);
        }
        // no user was found, lets create a new one
        else if (!user) {
          const newUser = new User({
            email: profile.emails[0].value,
            username: profile.username,
            name: profile.displayName,
            photo: profile.photos[0].value,

            twitterProvider: {
              id: profile.id,
              token: token,
              tokenSecret: tokenSecret
            }
          });
          newUser.save(function (error, savedUser) {
            console.log("saveuser-=======", savedUser);
            if (error) {
              console.log("err==", err);
            }
            const email = profile.emails[0].value;
            const payload = { email };
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });
            const userData = {
              user: savedUser,
              token: token
            }
            return res(error, userData);
          });
        } else {
          return res(err, user);
        }
      });
    }));
};                                                                                                     