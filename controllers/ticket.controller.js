const asyncHandler = require('../helpers/async');
const ErrorResponse = require('../utils/errorResponse');
const Ticket = require('../models/Ticket.model');

exports.create = asyncHandler(async (req, res, next) => {
  const body = req.body;
  const { fid, cid, showTime, seat, room, price = 70000 } = body;

  if (!fid && !cid) {
    const message = !fid
      ? 'Không xác định được phim'
      : 'Không xác định được rạp';
    next(new ErrorResponse(message, 400));
  }

  const findTicket = await Ticket.find({
    filmId: fid,
    cinemaId: cid,
    showTime
  });

  if (findTicket.length) {
    return next(new ErrorHandler('Chỗ ngồi đã có người đặt', 400));
  }

  const ticket = await Ticket({
    filmId: fid,
    cinemaId: cid,
    showTime,
    seat,
    room,
    price
  });

  return res.status(201).json({
    success: true,
    ticket
  });
});
