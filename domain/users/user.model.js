const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let reviewSchema = new Schema({
  date: {type: Date, default: Date.now},
  operator: {type: String, enum: ["Add", "Subtract", "Multiply", "Divide"]},
  difficulty: {type: String, enum: ["Easy", "Medium", "Hard"]},
  questions: [Schema.Types.Mixed]
});

let userSchema = new Schema({
    email: {type: String, required: [true, "Missing email"]},
    password: {type: String, required: [true, "Missing password"]},
    name: {type: String, required: [true, "Missing Name"]},
    // name: {
    //   firstName: {type: String, required: [true, "Missing name"]},
    //   lastName: {type: String, required: [true, "Missing Last Name"]}
    // }
    history: [Schema.Types.ObjectId],
    review: [reviewSchema]
  });
 
module.exports.Review = mongoose.model('Review', reviewSchema);  
module.exports.User = mongoose.model('User', userSchema);