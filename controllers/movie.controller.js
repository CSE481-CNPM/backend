const asyncHandler = require('../helpers/async');

/**
 * @description Xem tất cả các bộ phim có trên website
 * @route [GET] /api/v1/film
 * @access  PUBLIC
 */
exports.get = asyncHandler(async (req, res) => {
  res.status(200).json({
    description: 'get all films'
  });
});
