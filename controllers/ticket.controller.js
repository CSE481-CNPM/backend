const asyncHandler = require('../helpers/async');
const ErrorResponse = require('../utils/errorResponse');
const Ticket = require('../models/Ticket.model');
const Movie = require('../models/Movie.model');
const Cinema = require('../models/Cinema.model');

/**
 * @description Đặt vé xem phim
 * @route [POST] /api/v1/ticket
 * @access PRIVATE
 */
exports.create = asyncHandler(async (req, res, next) => {
  const body = req.body;
  const { filmId, cinemaId, showTime, seat, room, price = 70000 } = body;

  const movie = await Movie.findById(filmId);
  const cinema = await Cinema.findById(cinemaId);

  if (!movie || !cinema) {
    return next(
      new ErrorResponse('Thông tin chưa đầy đủ hãy kiểm tra lại', 400)
    );
  }

  const findTicket = await Ticket.find({
    filmId,
    cinemaId,
    showTime,
    seat
  })
    .where('status')
    .in(['booked']);

  if (findTicket.length) {
    return next(new ErrorResponse('Chỗ ngồi đã có người đặt', 400));
  }

  const ticket = await Ticket.create({
    filmId,
    cinemaId,
    showTime,
    seat,
    room,
    price,
    userId: req.user.id
  });

  return res.status(201).json({
    success: true,
    ticket
  });
});

/**
 * @description Hiện thị danh sách về mà tài khoản đó đã đặt
 * @route [GET] /api/v1/ticket
 * @access PRIVATE
 */
exports.all = asyncHandler(async (req, res, next) => {
  const ticket = await Ticket.find({ userId: req.user.id })
    .populate([{ path: 'filmId' }, { path: 'cinemaId' }])
    .exec();

  if (!ticket) {
    return next(ErrorResponse('Không tìm thấy thông tin', 404));
  }

  res.status(200).json({
    success: true,
    ticket
  });
});

/**
 * @description Hiện thị danh sách tất cả các vé đã đặt bao gồm người dùng khác và admin (Admin)
 * @route [GET] /api/v1/ticket/list
 * @access PRIVATE
 */
exports.showForAdmin = asyncHandler(async (req, res, next) => {
  const ticket = await Ticket.find()
    .populate([{ path: 'filmId' }, { path: 'cinemaId' }, { path: 'userId' }])
    .exec();

  return res.status(200).json({
    success: true,
    ticket
  });
});

/**
 * @description Hủy vé đã đặt của tài khoản hiện tại
 * @route [PUT] /api/v1/ticket/:id
 * @access PRIVATE
 */
exports.status = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const status = req.body.status;

  if (!status | !['booked', 'cancelled'].includes(status)) {
    return next(new ErrorResponse('Trạng thái vé không hợp lệ', 400));
  }

  const ticket = await Ticket.findByIdAndUpdate(
    id,
    { status, seat: '' },
    {
      new: true,
      runValidators: true
    }
  );

  if (!ticket) {
    return res.status(400).json({ success: true });
  }

  return res.status(200).json({
    success: true,
    status
  });
});

/**
 * @description Hủy vé đã đặt của tất cả tài khoản khi đã đặt vé (Admin)
 * @route [PUT] /api/v1/ticket/:tid/user/:uid
 * @access PRIVATE
 */
exports.statusForAdmin = asyncHandler(async (req, res, next) => {
  const fid = req.params.fid;
  const status = req.body.status;

  if (!status | !['booked', 'cancelled'].includes(status)) {
    return next(new ErrorResponse('Trạng thái vé không hợp lệ', 400));
  }

  const ticket = await Ticket.findOneAndUpdate(
    { filmId: fid },
    { status },
    {
      new: true,
      runValidators: true
    }
  );

  if (!ticket) {
    return res.status(400).json({ success: true });
  }

  return res.status(200).json({
    success: true,
    status
  });
});
