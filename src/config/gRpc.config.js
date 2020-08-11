const mali = require("mali");

const path = require("path");
const grpc = require("grpc");

const protoLoader = require("@grpc/proto-loader");

const handler = require("../app/handler");

const PROTO_PATH = path.resolve("./src/protos/cinima.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const cinemaProto = grpc.loadPackageDefinition(packageDefinition);

const router = new mali(cinemaProto, "CinemaService");

router.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.info(
    "----------- grpc %s [%s] - %s ms ----------",
    ctx.name,
    ctx.type,
    ms
  );
});

router.use("listAvailableSeats", handler.listAvailableSeatsRequest);
router.use("reserveSeats", handler.reserveSeats);

module.exports = router;
