const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {type: String, required: [true, "Missing email"]},
    password: {type: String, required: [true, "Missing password"]},
    name: {type: String, required: [true, "Missing Name"]},
    // name: {
    //   firstName: {type: String, required: [true, "Missing name"]},
    //   lastName: {type: String, required: [true, "Missing Last Name"]}
    // }
    history: [Schema.Types.ObjectId],
    review: [Schema.Types.ObjectId]

  });

module.exports = mongoose.model('User', userSchema);