const rateLimit = require("express-rste-limit");
const { logEvents } = require("./logger");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: {
    message:
      "Too many login attempts from this IP, please try again after 60 seconds pause",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too Many Requests ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log"
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});


module.exports = loginLimiter;