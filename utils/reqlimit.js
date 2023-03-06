const rateLimit = require('express-rate-limit')


module.exports = rateLimit({
  windowMs: 5 * 1000, // 5 sec
  max: 25,
  skip: (req) => {
    return ['swagger'].some((item) => req.originalUrl.includes(item))
  }
})
