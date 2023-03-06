const winston = require('winston')
const dailyRotateFile = require('winston-daily-rotate-file')
const path = require('path')
const moment = require('moment-timezone')
const loggerDateTimeFormat = 'ddd, DD MMM YYYY HH:mm:ss'
const logFileDir = path.join(__dirname, '../../logs/error-logs/')



const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack })
  }
  return info
})


const printf = winston.format.printf((info) => {
  // const timestamp = (process.env.NODE_ENV === 'dev') ? info.timestamp : moment(info.timestamp, loggerDateTimeFormat).utc().format(loggerDateTimeFormat)
  const timestamp = moment(info.timestamp, loggerDateTimeFormat).utc().format(loggerDateTimeFormat)
  return `[${timestamp} GMT] ${info.level}: ${info.message}`
})


const rfs = require('rotating-file-stream')
const stream = rfs.createStream(`${moment().format('YYMMDD')}.log`, {
  size: '5M',
  interval: '1d',
  path: logFileDir,
  compress: 'gzip'
})
winston.transports.Stream = stream

const logger = winston.createLogger({
  level: (process.env.NODE_ENV === 'dev') ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.combine(
      winston.format.timestamp({ format: loggerDateTimeFormat }),
      printf,
    ),
  ),
  transports: [
    new winston.transports.Console({
      level: 'debug', // this will make to print error, info and to debug level logs
      handleExceptions: true,
      json: false,
    }),
    new winston.transports.File({
      level: 'error', // this will make to print only error level logs
      filename: `${logFileDir}/${moment().format('YYMMDD')}.log`,
      // maxsize: 5242880, // 5mb
      format: winston.format.combine(
        winston.format.uncolorize()
      ),
    }),
    // new dailyRotateFile({
    //   auditFile: 'winston-audit-file',
    //   level: 'error',
    //   filename: (path.join(__dirname, '../../logs/server-logs/error-logs.log')),
    //   zippedArchive: true,
    //   maxSize: '5m',
    //   maxFiles: '2d',
    //   format: winston.format.combine(
    //     winston.format.uncolorize()
    //   ),
    // })
  ],
  exitOnError: false
})


module.exports = logger
