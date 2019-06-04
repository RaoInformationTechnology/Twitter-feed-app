var userModel = require('../model/user.model');
var userController = {};
const mongoose = require('../mongoose');



userController.addtag = function(req,res){
  var hash = req.body;
  console.log("hashhhh-----",hash);
  const hashTag = req.body.hash;
  userModel.findOneAndUpdate({email: req.body.email}, {$addToSet: {hashtag: req.body}}, {new: true}, (upderr, updres) => {
    console.log("addhashtag==============");
    if (upderr) {
      console.log("errrrrrrrr",upderr);
    } else {
      console.log('updres: ', updres);
      res.status(200).json({message: 'Updated successfully'});
    }
  });
}

userController.deletehashtag = function(req,res){
  console.log("hashtag============");
  var hashtag = req.body;
  console.log("hashtag======",hashtag);
  userModel.update({email: req.body.email},{ $pull: { "hashtag" : { hashtag: req.body.hashtag } } },function(err,deletehashtag){
    console.log("deletehashtag=========",deletehashtag);
    console.log(err,deletehashtag);
    res.send(deletehashtag)
  })
}


userController.getHashTag = function(req,res){

  var email = req.params.email;
  console.log("email==========",email);

  userModel.find({email:email},function(err,hashtag){
    console.log("hashtag======",hashtag);
    res.send(hashtag);
  })
}



module.exports = userController;