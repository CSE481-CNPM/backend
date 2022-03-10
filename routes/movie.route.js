const express = require('express');
const router = express.Router();

const { all, create } = require('../controllers/movie.controller');
const { protect, hasAuthorization } = require('../middleware/auth');

router.get('/', all);
router.post('/', protect, hasAuthorization('admin'), create);

module.exports = router;
