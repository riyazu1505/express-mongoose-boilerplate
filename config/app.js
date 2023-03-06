const express = require('express')
const app = express()
const path = require('path')


// config
app.set('PORT', process.env.APP_SERVER_PORT || 8088)


// middlewares
app.use(express.json({ limit: '2mb' })) // to parse req body & limit the req size and upload file size
app.use(express.urlencoded({ extended: true, parameterLimit: 4 })) // parse urlencoded req body
app.use(require('cookie-parser')())
app.use(require('helmet')()) // to set security HTTP headers
app.use(require('cors')()) // cors settings
app.use(require('xss-clean')()) // sanitize request data
app.use(require('express-mongo-sanitize')()) // sanitize request data
app.use(require('compression')()) // gzip compression
app.use(require('response-time')())
app.use('/api', require('../utils/reqlimit')) // 25 req per 5 sec
app.use(require('../utils/loggers/morgan')) // req logger


// routes
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('../helpers/reqResConfig'))
app.use('/api', require('../config/routes')) // api routes


// error handling
const { apiErrorHandler } = require('../helpers/errorHandlers')
app.use(apiErrorHandler)


module.exports = app
