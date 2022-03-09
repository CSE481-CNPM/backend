const express = require('express');
const router = express.Router();

const { getAll, detail } = require('../controllers/film.controller');

router.get('/', getAll);
router.get('/:id', detail);

module.exports = router;
