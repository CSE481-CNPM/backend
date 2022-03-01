const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Mời nhập tên của bạn']
  },
  lastname: {
    type: String,
    required: [true, 'Mời nhập họ của bạn']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Mời bạn nhập email'],
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      'Email nhập không hợp lệ'
    ]
  },
  phone: {
    type: String,
    unique: true,
    required: [true, 'Mời nhập số điện thoại']
  },
  password: {
    type: String
  }
});

module.exports = mongoose.model('User', UserSchema);
