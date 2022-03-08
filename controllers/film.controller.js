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

exports.single = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const film = await Film.findById(id);

  res.status(200).json({
    success: true,
    film
  });
});
