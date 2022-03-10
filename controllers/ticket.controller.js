const asyncHandler = require('../helpers/async');
const ErrorResponse = require('../utils/errorResponse');
const Ticket = require('../models/Ticket.model');
const Movie = require('../models/Movie.model');
const Cinema = require('../models/Cinema.model');

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
    showTime
  });

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

exports.all = asyncHandler(async (req, res, next) => {
  const ticket = await Ticket.find({ userId: req.user.id });

  res.status(200).json({
    success: true,
    ticket
  });
});
