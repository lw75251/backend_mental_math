const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
  });

module.exports = mongoose.model('User', userSchema);