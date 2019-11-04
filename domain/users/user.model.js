import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

let userSchema = new Schema({
    uid: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
  });

userSchema.static.findByUid = function( uid ) {
    return this.find({ uid });
}

var userModel = model('User', userSchema);

// Export the model
export default userModel