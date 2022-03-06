const asyncHandler = require('../helpers/async');
const Film = require('../models/Film.model');

/**
 * @description Xem tất cả các bộ phim có trên website
 * @route [GET] /api/v1/film
 * @access  PUBLIC
 */
exports.getAll = asyncHandler(async (req, res) => {
  const film = await Film.find();

  res.status(200).json({
    success: true,
    films: film
  });
});
