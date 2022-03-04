const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Tên của bạn không được bỏ trống'],
  },
  lastname: {
    type: String,
    required: [true, 'Họ của bạn không được bỏ trống'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email không được bỏ trống'],
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      'Email không hợp lệ',
    ],
  },
  phone: {
    type: String,
    unique: true,
    required: [true, 'số điện thoại không được bỏ trống'],
    minlength: [10, 'Số điện thoại không hợp lệ'],
    maxlength: [10, 'Số điện thoại không hợp lệ'],
    match: [
      /((\+)84|0[3|5|7|8|9])+([0-9]{8})\b/g,
      'Số điện thoại không hợp lệ',
    ],
  },
  password: {
    type: String,
    required: [true, 'mật khẩu không được bỏ trống'],
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  avatar: {
    type: String,
    default: '',
  },
  bookingTicket: [
    {
      type: Object,
      nameFilm: {
        type: String,
        default: '',
      },
      money: {
        type: Number,
        default: 0,
      },
      bookingDate: {
        type: Date,
        default: '',
      },
      seat: {
        type: String,
        default: '',
      },
      cinema: {
        type: String,
        default: '',
      },
      room: {
        type: String,
        default: '',
      },
      showTime: {
        type: String,
        default: '',
      },
      movieDay: {
        type: Date,
        default: '',
      },
      ticket: {
        ref: 'Ticket',
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
