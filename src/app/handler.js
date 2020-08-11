let indexSeatsAvalibles = require("../config/seedData.config");
const createGRPCError = require("create-grpc-error");

const listAvailableSeatsRequest = async (ctx) => {
  const dataResponse = indexSeatsAvalibles.map((element) => ({
    row: Math.floor(element / process.env.COLLUM),
    collum: element % process.env.COLLUM,
  }));

  console.log(indexSeatsAvalibles);

  ctx.res = { seats: dataResponse };
};

const reserveSeats = async (ctx) => {
  const { seats } = ctx.req;

  const seatsIndex = seats.map(
    (seat) => seat.row * process.env.ROW + seat.collum
  );

  seatsIndex.forEach((element) => {
    if (!indexSeatsAvalibles.includes(element)) {
      throw createGRPCError(
        "Seat picked invaild, please recheck and submit.",
        11
      );
    }
  });

  console.log(seats)

  seats.forEach((seat) => {
    indexSeatsAvalibles = indexSeatsAvalibles.filter(
      (element) =>
        Math.abs(Math.floor(element / process.env.COLLUM) - seat.row) +
          Math.abs((element % process.env.COLLUM) - seat.collum) >
        process.env.MIN_DINSTANCE
    );
  });

  console.log(indexSeatsAvalibles);

  ctx.res = { seats };
};

module.exports = {
  listAvailableSeatsRequest,
  reserveSeats,
};
