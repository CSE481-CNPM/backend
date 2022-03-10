const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const { create } = require('../controllers/ticket.controller');

router.post('/', protect, create);

module.exports = router;
