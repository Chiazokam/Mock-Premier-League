/* eslint-disable func-names */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: false,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);
export default User;
