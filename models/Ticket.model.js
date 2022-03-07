const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema(
  {
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
    time: {
      type: String
    },
    filmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Film'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Ticket', TicketSchema);
