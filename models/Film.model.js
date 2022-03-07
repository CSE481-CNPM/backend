const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema(
  {
    nameFilm: {
      type: String,
      required: [true, 'Tên Phim không được để trống']
    },
    description: {
      type: String,
      required: [true, 'Nội dung phim không được để trống']
    },
    director: {
      type: String,
      required: [true, 'Đạo diễn của phim không được để trống']
    },
    country: {
      type: String,
      required: [true, 'Quốc gia không được để trống']
    },
    category: {
      type: String,
      required: [true, 'Thể loại phim không được bỏ trống']
    },
    actor: {
      type: Array,
      required: [true, 'Diễn viên chính của phim không được để trống']
    },
    cinema: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cinema'
      }
    ],
    movieDay: {
      type: Date,
      required: [true, 'Ngày chiếu phim không được để trống']
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model('Film', FilmSchema);
