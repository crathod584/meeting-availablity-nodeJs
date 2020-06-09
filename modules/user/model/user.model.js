const mongoose = require('../../../config/mongoose.service').mongoose;
const Schema = mongoose.Schema;

/**
* @desc Creating a User Schema
*/
const userSchema = new Schema({
  userName:{
    type:String,
    trim:true
  }
});

const user = mongoose.model('User', userSchema);

module.exports = { User: user };

