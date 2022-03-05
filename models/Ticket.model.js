const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  seat: {
    type: String,
    required: [true, 'Mời nhập chỗ ngồi']
  },
  isActive: {
    type: Boolean,
    default: false
  },
  room: {
    type: String,
    required: [true, 'Mời nhập phòng']
  },
  price: {
    type: Number,
    required: [true, 'Mời nhập giá vé']
  },
  premiereSchedule: [
    {
      cinema: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cinema'
      },
      time: [
        {
          type: String
        }
      ]
    }
  ],
  filmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Film'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ticket', TicketSchema);
