// import packages
const express = require('express');
const dotenv = require('dotenv');
const logger = require('./helpers/logger');
const connectDabase = require('./config/database');

// process config
const app = express();
dotenv.config();
connectDabase();

// import router
const filmRouter = require('./routes/film.route');
const authRouter = require('./routes/auth.route');

app.use(express.json());
app.use('/api/v1/film', filmRouter);
app.use('/api/v1/auth', authRouter);

// constant variable
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`Server is start on port ${PORT}`);
});

server.on('unhandledRejection', (err, promise) => {
  logger.error(err.message);
  server.close(() => process.exit(1));
});
