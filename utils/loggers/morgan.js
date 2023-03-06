const morgan = require('morgan')
const path = require('path')
const moment = require('moment')
const rfs = require('rotating-file-stream')


// custom tokens
// morgan.token('tenant', (req, { locals }) => locals ? locals.tenant : '')
// morgan.token('userId', (req, { locals }) => locals.userData ? locals.userData._id : '')
// morgan.token('userName', (req, { locals }) => locals.userData ? locals.userData.name : '')

// rfs stream
const stream = rfs.createStream(`${moment().format('YYMMDD')}.log`, {
  size: '5M',
  interval: '1d',
  path: path.join(__dirname, '../../logs/req-logs/'),
  compress: 'gzip'
})


// logger setup
module.exports = morgan('[:date] [remote-addr :remote-addr] ":method :url HTTP/:http-version" [status :status] [content-length :res[content-length]] [response-time :response-time] [total-time :total-time] "referrer :referrer" "user-agent :user-agent"', {
  // skip: ({ originalUrl }) => {
  //   return originalUrl.includes('swagger')
  // },
  stream,
})
