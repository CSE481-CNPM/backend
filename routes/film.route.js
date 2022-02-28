const express = require('express');
const router = express.Router();

const { getAll } = require('../controllers/film.controller');

router.get('/', getAll);

module.exports = router;
