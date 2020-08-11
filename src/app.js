const grpc = require("./config/gRpc.config");
require("./config/seedData.config");

const startServer = async () => {
  try {
    grpc.start(`0.0.0.0:3333`);

    console.info(`[GRPC] Server is started on 0.0.0.0:3333`);
  } catch (error) {
    console.error(error);
  }
};

startServer();
