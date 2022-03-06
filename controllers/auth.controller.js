const asyncHandler = require('../helpers/async');
const User = require('../models/User.model');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @description Đăng nhập
 * @route [POST] /api/v1/auth/login
 * @access PUBLIC
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse('Hãy cung cấp email và mật khẩu đầy đủ', 400)
    );
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Tài khoản không tồn tại', 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Sai mật khẩu', 401));
  }

  sendTokenResponse(user, 200, res);
});

/**
 * @description Đăng ký
 * @route [POST] /api/v1/auth/register
 * @access PUBLIC
 */
exports.register = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;
  const role = req.body.role === 'admin' ? 'admin' : 'user';

  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
    role
  });

  sendTokenResponse(user, 201, res);
});

const sendTokenResponse = async (user, statusCode, res) => {
  const token = user.signedJwt();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token
  });
};

/**
 * @description Xem thông tin tài khoản người dùng
 * @route [GET] /api/v1/auth/register
 * @access PRIVATE
 */
exports.me = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Lỗi xác thực'
    });
  }

  res.status(200).json({
    success: true,
    user
  });
});
