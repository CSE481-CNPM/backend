const express = require('express');
const router = express.Router();

const {
  all,
  create,
  detail,
  update
} = require('../controllers/movie.controller');
const { protect, hasAuthorization } = require('../middleware/auth');

router.get('/', all);
router.get('/:id', detail);
router.post('/', protect, hasAuthorization('admin'), create);
router.put('/:id', protect, hasAuthorization('admin'), update);

module.exports = router;
