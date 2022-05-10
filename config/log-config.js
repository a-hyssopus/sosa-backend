const winston = require('winston');
const { combine, timestamp, printf, colorize, align } = winston.format;
require('winston-daily-rotate-file');
const config = require("config");

const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/sosa-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
});

const transports = [
    new winston.transports.Console()
]

if (config.get("log.logToFile")) {
    transports.push(fileRotateTransport);
}

const logger = winston.createLogger({
    level:  'debug',
    format: combine(
        colorize({ all: true }),
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: transports,
    exceptionHandlers: [
        transports
    ],
    rejectionHandlers: [
        transports
    ],
});

module.exports = logger;
