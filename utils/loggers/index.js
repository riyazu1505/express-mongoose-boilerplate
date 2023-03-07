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
      format: winston.format.combine(
        winston.format.uncolorize(),
      ),
    }),
  ],
  exitOnError: false
})

logger.on('data', (info) => {
  if (!info.level || !info.level.includes('error')) return
  // send alert to developers & pm.
  // console.log('inside')
})



module.exports = logger
