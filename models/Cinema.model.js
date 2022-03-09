const mongoose = require('mongoose');

const CinemaSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    address: {
      type: String
    },
    province: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = CinemaSchema.model('Cinema', CinemaSchema);
