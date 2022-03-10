const asyncHandler = require('../helpers/async');
const Film = require('../models/Film.model');
const Cinema = require('../models/Cinema.model');

/**
 * @description Xem tất cả các bộ phim có trên website
 * @route [GET] /api/v1/film
 * @access  PUBLIC
 */
exports.get = asyncHandler(async (req, res) => {
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

  const film = new Film();
  const cinema = await Cinema.find({}, ['_id']);
  const listCinema = new Array(cinema.length);

  for (let i = 0; i < listCinema.length; ++i) listCinema[i] = cinema[i]['_id'];
  film.cinema = listCinema;
  film.nameFilm = nameFilm;
  film.description = description;
  film.director = director;
  film.country = country;
  film.category = category;
  film.actor = actor;
  film.movieDay = movieDay;

  await film.save();

  return res.status(201).json({
    success: true,
    film
  });
});
