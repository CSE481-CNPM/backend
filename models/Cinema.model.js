const mongoose = require('mongoose');

const CinemaSchema = new mongoose.Schema({
  name: {
    type: String
  },
  address: {
    type: String
  },
  province: {
    type: String
  }
});

module.exports = CinemaSchema.model('Cinema', CinemaSchema);
