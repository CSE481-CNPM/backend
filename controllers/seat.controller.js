const ErrorResponse = require('../utils/errorResponse');
const asyncHanler = require('../helpers/async');

const Ticket = require('../models/Ticket.model');

exports.show = asyncHanler(async (req, res, next) => {
  const { fid, cid, st } = req.query;
  const format_st = st.slice(0, 2) + ':' + st.slice(2, st.length);

  const ticket = await Ticket.find({
    filmId: fid,
    cinemaId: cid,
    showTime: format_st
  });

  const listBookedTickets = ticket.map((ticket) => ticket['seat']);

  res.status(200).json({
    success: true,
    seat: listBookedTickets
  });
});
