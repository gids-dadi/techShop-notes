const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}:${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errlog.log"
  );
  console.log(err.stack);

  const errStatus = res.statusCode ? res.statusCode : 500;

  res.status(errStatus)

  res.json( { message: err.message})
};

module.exports = errorHandler