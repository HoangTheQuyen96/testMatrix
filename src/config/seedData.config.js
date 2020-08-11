require("dotenv").config();

module.exports = [...new Array(process.env.ROW * process.env.COLLUM)].map(
  (_, index) => index
);
