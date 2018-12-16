const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: String,
  password: String,
  profile:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
});


const User =  mongoose.model('User', UserSchema);
module.exports = User;