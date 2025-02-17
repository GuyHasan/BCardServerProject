const morgan = require("morgan");
const { currentTime } = require("../../utils/timeHelper");
const chalk = require("chalk");

// prettier-ignore
const morganLogger = morgan(function (tokens, req, res) {
    const { year, month, day, hour, minute, second } = currentTime();
    let message = [`${day}/${month}/${year} ${hour}:${minute}:${second}`, tokens.method(req, res), tokens.url(req, res), tokens.status(req, res), "-", tokens["response-time"](req, res), "ms"].join(" ");
    if(res.statusCode >= 400) {
        return chalk.redBright(message);
    }else{
        return chalk.cyanBright(message);
    }
});

module.exports = morganLogger;
