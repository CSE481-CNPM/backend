const express = require('express');
const router = express.Router();

const { getAll, create } = require('../controllers/film.controller');
const { protect, hasAuthorization } = require('../middleware/auth');

router.get('/', getAll);
router.post('/', protect, hasAuthorization('admin'), create);

module.exports = router;
