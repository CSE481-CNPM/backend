const express = require('express');
const router = express.Router();
const { protect, hasAuthorization } = require('../middleware/auth');

const {
  create,
  all,
  showForAdmin
} = require('../controllers/ticket.controller');

router.get('/', protect, all);
router.post('/', protect, create);
router.get('/list', protect, hasAuthorization('admin'), showForAdmin);

module.exports = router;
