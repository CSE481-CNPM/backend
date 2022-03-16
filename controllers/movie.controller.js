const asyncHandler = require('../helpers/async');
const Movie = require('../models/Movie.model');
const Cinema = require('../models/Cinema.model');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @description Xem tất cả các bộ phim có trên website
 * @route [GET] /api/v1/movie
 * @access  PUBLIC
 */
exports.all = asyncHandler(async (req, res) => {
  const movie = await Movie.find();

  res.status(200).json({
    success: true,
    films: movie
  });
});

/**
 * @description Thêm mới 1 bộ phim (admin)
 * @route [POST] /api/v1/movie
 * @access  PRIVATE
 */
exports.create = asyncHandler(async (req, res, next) => {
  const {
    nameFilm,
    description,
    director,
    country,
    category,
    actor,
    movieDay,
    background,
    avatar
  } = req.body;

  const movie = new Movie();
  const cinema = await Cinema.find({}, ['_id']);
  const listCinema = new Array(cinema.length);

  for (let i = 0; i < listCinema.length; ++i) listCinema[i] = cinema[i]['_id'];
  movie.cinema = listCinema;
  movie.nameFilm = nameFilm;
  movie.description = description;
  movie.director = director;
  movie.country = country;
  movie.category = category;
  movie.actor = actor;
  movie.movieDay = movieDay;
  movie.background = background;
  movie.avatar = avatar;

  await movie.save();

  return res.status(201).json({
    success: true,
    movie
  });
});

/**
 * @description Xem chi tiết 1 bộ phim
 * @route [GET] /api/v1/movie/:id
 * @access PUBLIC
 */
exports.detail = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const movie = await Movie.findById(id).select('-cinema');

  if (!movie) {
    return next(new ErrorResponse('Không tìm thấy phim', 404));
  }

  res.status(200).json({
    success: true,
    movie
  });
});

/**
 * @description Cập nhật 1 bộ phim (Admin)
 * @route [PUT] /api/v1/movie/:id
 * @access PRIVATE
 */
exports.update = asyncHandler(async (req, res, next) => {
  delete req.body.cinema;
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!movie) {
    return res.status(400).json({ success: false });
  }

  res.status(200).json(movie);
});
