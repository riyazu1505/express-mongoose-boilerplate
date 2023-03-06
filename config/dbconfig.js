const logger = require('../utils/loggers')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise


var conn = mongoose.createConnection((process.env.DB_CONNECTION_URL), {
  connectTimeoutMS: 15000,
  socketTimeoutMS: 30000,
  serverSelectionTimeoutMS: 15000,
})
exports.conn = conn


conn.on('connected', () => { logger.info('database connected') })

conn.on('error', (error) => {
  console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
  conn.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`));
})


exports.dbmodel = (schema, dbname) => {
  conn = conn.useDb((dbname || process.env.DB_NAME), { useCache: true })
  return conn.model((schema.options.collection), schema)
}

