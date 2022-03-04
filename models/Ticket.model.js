const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  seat: {
    type: String,
    required: [true, 'Mời nhập chỗ ngồi'],
  },
  room: {
    type: String,
    required: [true, 'Mời nhập phòng'],
  },
  price: {
    type: Number,
    required: [true, 'Mời nhập giá vé'],
  },
  IDFilm: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Ticket', TicketSchema);
