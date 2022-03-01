const asyncHandler = require('../helpers/async');
const User = require('../models/User.model');

/**
 * @description Đăng nhập
 * @route [POST] /api/v1/auth/login
 * @access PUBLIC
 */
exports.login = asyncHandler(async (req, res) => {
  res.send('login');
});

/**
 * @description Đăng ký
 * @route [POST] /api/v1/auth/register
 * @access PUBLIC
 */
exports.register = asyncHandler(async (req, res) => {
  res.send('register');
});
