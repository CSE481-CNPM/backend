const asyncHandler = require('../helpers/async');
const Movie = require('../models/Movie.model');
const Cinema = require('../models/Cinema.model');

/**
 * @description Xem tất cả các bộ phim có trên website
 * @route [GET] /api/v1/film
 * @access  PUBLIC
 */
exports.all = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    films: film
  });
});

/**
 * @description Thêm mới 1 bộ phim (admin)
 * @route [POST] /api/v1/film
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
    movieDay
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

  await film.save();

  return res.status(201).json({
    success: true,
    film
  });
});

exports.detail = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const movie = await Movie.findById(id).select('-cinema');

  res.status(200).json({
    success: true,
    movie
  });
});
