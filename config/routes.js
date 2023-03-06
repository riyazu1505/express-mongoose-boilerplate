const app = require('express')()

app.use('/', require('../controllers/common.js'))

module.exports = app