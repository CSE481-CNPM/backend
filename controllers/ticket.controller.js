const asyncHandler = require('../helpers/async');
const ErrorResponse = require('../utils/errorResponse');
const Ticket = require('../models/Ticket.model');
const Movie = require('../models/Movie.model');
const Cinema = require('../models/Cinema.model');

exports.create = asyncHandler(async (req, res, next) => {
  const body = req.body;
  const { filmId, cinemaId, showTime, seat, room, price = 70000 } = body;

  await Movie.findById(filmId);
  await Cinema.findById(cinemaId);

  const findTicket = await Ticket.find({
    filmId,
    cinemaId,
    showTime
  });

  if (findTicket.length) {
    return next(new ErrorHandler('Chỗ ngồi đã có người đặt', 400));
  }

  const ticket = await Ticket({
    filmId,
    cinemaId,
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
