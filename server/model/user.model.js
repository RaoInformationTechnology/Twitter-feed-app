const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** UserModel Use This UserSchema */
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  username: {
    type: String,
    required: true
  },
  name: { 
    type: String,
     required: true 
    },
  photo: { 
    type: String,
     required: true 
    },
  twitterProvider: {
    type: {
      id: String,
      token: String
    },
    select: false
  },
  hashtag: []
});

module.exports = mongoose.model('User', UserSchema);

