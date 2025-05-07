const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: 'user', // 'admin' cho quản trị
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
