// var mongoose = require('mongoose'),
// Schema = mongoose.Schema;

// module.exports = function () {

//   var db = mongoose.connect('mongodb://localhost:27017/twitter-db',{ useNewUrlParser: true } );


//   var UserSchema = new Schema({
//     email: {
//       type: String, required: true,
//       trim: true, unique: true,
//       match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//     },
//     twitterProvider: {
//       type: {
//         id: String,
//         token: String
//       },
//       select: false
//     }
//   });

//   UserSchema.set('toJSON', {getters: true, virtuals: true});

//   UserSchema.statics.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
//     var that = this;
//     return this.findOne({
//       'twitterProvider.id': profile.id
//     }, function(err, user) {
//       // no user was found, lets create a new one
//       if (!user) {
//         var newUser = new that({
//           email: profile.emails[0].value,
//           twitterProvider: {
//             id: profile.id,
//             token: token,
//             tokenSecret: tokenSecret
//           }
//         });

//         newUser.save(function(error, savedUser) {
//           console.log(savedUser);
//           if (error) {
//             console.log(error);
//           }
//           return cb(error, savedUser);
//         });
//       } else {
//         return cb(err, user);
//       }
//     });
//   };

//   // UserSchema.statics.addtag = function(req,res){
//   //   var that = this;
//   //   console.log("hiiiiiii");
//   //   var hash = req.body;
//   //   console.log("hashhhh-----",hash);
//   //   const hashTag = req.body.hash;
//   //   this.findOneAndUpdate({email: req.body.email}, {$addToSet: {hashtag: hashTag}}, {new: true}, (upderr, updres) => {
//   //     console.log("addhashtag==============");
//   //     if (upderr) {
//   //       console.log("errrrrrrrr",upderr);
//   //     } else {
//   //       console.log('updres: ', updres);
//   //       res.status(200).json({message: 'Updated successfully'});
//   //     }
//   //   });
//   // }
// // 


//   mongoose.model('User', UserSchema);

//   return db;
// };