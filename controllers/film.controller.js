const asyncHandler = require('../helpers/async');
const Film = require('../models/Film.model');

/**
 * @description Xem tất cả các bộ phim có trên website
 * @route [GET] /api/v1/film
 * @access  PUBLIC
 */
exports.getAll = asyncHandler(async (req, res) => {
  res.status(200).json({
    description: 'get all films'
  });
});

exports.detail = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const film = await Film.findById(id).select('-cinema');

  res.status(200).json({
    success: true,
    film
  });
});
