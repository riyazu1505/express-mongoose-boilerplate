const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`) })
const app = require('./config/app')
const server = require('http').createServer(app)


// config
server.timeout = 10000 // maximum waiting time of a request - 10 sec
process.env.UV_THREADPOOL_SIZE = (require('os')).cpus().length // By default, the thread pool size is 4 handling 4 IO operations at a time


// unhandled exceptions handler
const { unexpectedErrorHandler } = require('./helpers/errorHandlers')
process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)


server.listen((app.get('PORT')), () => {
  console.log(`Server is listening in port ${app.get('PORT')}`)
})
