const ErrorHandler = require('../utils/errorResponse');
const asyncHandler = require('../helpers/async');
const Film = require('../models/Film.model');
const Ticket = require('../models/Ticket.model');
const Cinema = require('../models/Cinema.model');

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

  //// CHOOSE THE RANDOM CINEMA FOR TICKET WHEN CREATED THE FILM  ////
  const cinema = await Cinema.find();
  const totalCinema = cinema.length;

  const tableCinema = {}; // object để lưu các rạp đã được chọn (Tránh trùng lặp rạp khi random)

  for (let i = 0; i < totalCinema; ++i) {
    if (!tableCinema[cinema[i].id]) {
      // random thời gian chiếu phim
      const hrs = Math.round(Math.random() * 24);
      const mins = Math.round(Math.random() * 60);

      // thời gian bắt đầu chiếu phim
      const formatTimeStart = `${hrs.toString().padStart(2, '0')}:${mins
        .toString()
        .padStart(2, '0')}`;

      // thời gian kết thúc suất chiếu
      const rndHour = Math.floor(Math.random() * 3 + 1); // Random khoảng thời gian kết thúc bộ phim (Tối đa 3 tiếng)
      const formatTimeEnd = `${((hrs + rndHour) % 24)
        .toString()
        .padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;

      // lưu key của object bằng id rạp - giá trị là thông tin của rạp (bao gồm tên rạp và giờ chiếu)
      tableCinema[cinema[i].id] = {
        nameCinema: cinema[i].name,
        time: `${formatTimeStart} - ${formatTimeEnd}` // Khoảng thời gian của suất chiếu
      };
    }
  }

  // khởi tạo mảng chứa mã của ghế ngồi (Khởi tạo mặc đinh ban đầu là false)
  const NUM_SEAT = 20; // sô ghế giới hạn
  const DIVISIBLE_NUM_SEAT = 5; // số chia hết cho số ghế (Dùng để phân số ghế trên 1 hàng)
  const seatInitial = new Array(NUM_SEAT).fill(false);

  // Mã đầu của dãy ghế - Tính theo hàng dọc
  /* 
    Example:
      A | 1 2 3 4 5
      B | 1 2 3 4 5
      C | 1 2 3 4 5
      D | 1 2 3 4 5

      Số ghế của các vé có chỗ ngồi tương ứng (vd: A2, B5, C3, ...)
  */
  for (let i = 0; i < NUM_SEAT; ++i) {
    const headSeatCode = String.fromCharCode(
      Math.floor(65 + parseInt(i / DIVISIBLE_NUM_SEAT))
    );
    const tailSeatCode = ((i % DIVISIBLE_NUM_SEAT) + 1).toString();
    seatInitial[i] = headSeatCode + tailSeatCode;
  }

  //// RANDOM THE TICKET - Tạo vé tự động và ngẫu nhiên cho rạp phim ////
  /*
    - Mỗi 1 bộ 1 phim được tạo độc lập thì các rạp có trong Database sẽ đều có phim đó
    - Ngày chiếu sẽ được cố định khi thêm 1 bộ phim mới
    - Khung giờ chiếu sẽ ngẫu nhiên, các rạp sẽ có khung giờ chiếu khác nhau
    - Các bộ phim khác nhau cũng sẽ có khung giờ chiếu khác nhau
    - Theo như quy ước tất cả các rạp đều có 20 chỗ ngồi
    - Tương ứng với các rạp sẽ tạo các vé tương ứng số ghế ngồi của các rạp (Hiện tại không chia nhiều phòng) 
      vd: rạp có 20 chỗ ngồi tương ứng tạo 20 vé và 20 vé là độc lập
    - các vé được tạo ra cùng 1 bộ phim sẽ cùng 1 khung giờ tương ứng 
      vd: 20 được tạo thì 20 vé có khung giờ cùng nhau và cùng 1 bộ phim
  */
  const film = new Film();

  film.nameFilm = nameFilm;
  film.description = description;
  film.director = director;
  film.country = country;
  film.category = category;
  film.actor = actor;
  film.movieDay = movieDay;

  await film.save();

  const idFilm = film._id;
  let listFilm = []; // Array chứa id rạp đã lưu vào film
  let listTicket = [];
  const room = Math.floor(Math.random() * 5 + 1); // random số phòng

  for (let idCinema in tableCinema) {
    listFilm = [...listFilm, idCinema];
    for (let i = 0; i < NUM_SEAT; ++i) {
      listTicket.push(
        Ticket.create({
          seat: seatInitial[i],
          room: room,
          price: 70000,
          filmId: idFilm,
          time: tableCinema[idCinema].time
        })
      );
    }
  }

  Promise.all(listTicket)
    .then(async (ticket) => {
      film.cinema = listFilm;
      await film.save();

      return res.status(201).json({
        success: true,
        amountTicket: ticket.length,
        film
      });
    })
    .catch((err) => {
      return next(new ErrorHandler(err, 500));
    });
});
