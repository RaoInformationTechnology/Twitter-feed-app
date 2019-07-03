const passport = require('passport');
TwitterTokenStrategy = require('passport-twitter-token');
const User = require('./model/user.model');
twitterConfig = require('./config.js');

module.exports = function () {

  passport.use(new TwitterTokenStrategy({
    consumerKey: twitterConfig.consumer_key,
    consumerSecret: twitterConfig.consumer_secret,
    includeEmail: true
  },
    (token, tokenSecret, profile, done) => {
      return new Promise((resolve, reject) => {
        User.findOne({
          'twitterProvider.id': profile.id
        }, function (err, user) {
          if (user) {
            return done(err, user);
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
              console.log(savedUser);
              if (error) {
                reject({ status: 500, message: 'Internal Server Error' });
              }
              resolve({ status: 200, message: 'user data fetched', data: savedUser });
              return done(error, savedUser);
            });
          } else {
            return done(err, user);
          }
        });
      })
    }));
};                                                                                                     