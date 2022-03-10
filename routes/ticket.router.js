const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const { create, all } = require('../controllers/ticket.controller');

router.get('/', protect, all);
router.post('/', protect, create);

module.exports = router;
