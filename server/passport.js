const passport = require('passport');
TwitterTokenStrategy = require('passport-twitter-token');
const  User = require('./model/user.model');
twitterConfig = require('./config.js');

module.exports = function () {

  passport.use(new TwitterTokenStrategy({
    consumerKey: twitterConfig.consumerKey,
    consumerSecret: twitterConfig.consumerSecret,
    includeEmail: true
  },
  (token, tokenSecret, profile, done) => {
    console.log("profilename-----",profile);

    User.findOne({
      'twitterProvider.id': profile.id
    }, function(err, user) {
      if(user){

        return done(err, user);
      }
      // no user was found, lets create a new one
      else if (!user) {
        var newUser = new User({
          email: profile.emails[0].value,
          username:profile.username,
          name:profile.displayName,
          photo:profile.photos[0].value,

          twitterProvider: {
            id: profile.id,
            token: token,
            tokenSecret: tokenSecret
          }
        });

        newUser.save(function(error, savedUser) {
          console.log(savedUser);
          if (error) {
            console.log(error);
          }
          return done(error, savedUser);
        });
      } else {
        return done(err, user);
      }
    });

    // User.findOne({
    //   'twitterProvider.id': profile.id
    // }).then((user) =>{

    //   if(user){

    //     console.log("user is currentuser=====",user);

    //   } else {

    //     new User({
    //       username:profile.displayName,
    //       email: profile.emails[0].value,
    //       twitterProvider: {
    //         id: profile.id,
    //         token: token,
    //         tokenSecret: tokenSecret,

    //       }
    //     }).save().then((newUser) =>{
    //       console.log("newuser is createad="+newUser)
    //     })
    //   }

    // })

  }));

};                                                                                                     