const mongoose = require('mongoose');
const logger = require('../helpers/logger');

const connectDabase = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true
  });
  if (process.env.NODE_ENV !== 'test') {
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  }
};

module.exports = connectDabase;
