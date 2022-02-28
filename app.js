// import packages
const express = require('express');
const dotenv = require('dotenv');
const logger = require('./helpers/logger');

// import router
const filmRouter = require('./routes/film.route');

// process config
const app = express();
dotenv.config();

app.use(express.json());
app.use('/api/v1/film', filmRouter);

// constant variable
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is start on port ${PORT}`);
});
