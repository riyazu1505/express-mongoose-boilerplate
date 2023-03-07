const router = require('express').Router()
const { dbmodel } = require('../config/dbconfig')
const schema = require('../schemas/vehicles')


router.get('/', async (req, res, next) => {
  const result = await dbmodel(schema).countDocuments({})
  // if (result) throw new Error('error message')
  res.send({ result })
})

module.exports = router
