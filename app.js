// import packages
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const logger = require('./helpers/logger');
const connectDabase = require('./config/database');

// import router
const filmRouter = require('./routes/film.route');
const authRouter = require('./routes/auth.route');

// process config
const app = express();
dotenv.config();
connectDabase();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

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
