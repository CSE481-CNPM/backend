const express = require('express');
const router = express.Router();

const { getAll, single } = require('../controllers/film.controller');

router.get('/', getAll);
router.get('/:id', single);

module.exports = router;
