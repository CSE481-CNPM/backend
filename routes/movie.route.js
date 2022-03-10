const express = require('express');
const router = express.Router();

const { get } = require('../controllers/movie.controller');

router.get('/', get);

module.exports = router;
