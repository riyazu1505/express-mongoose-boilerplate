const moment = require('moment')
const momentTz = require('moment-timezone')


const $_recursiveUpdate = (obj, options) => { // eslint-disable-line camelcase
  if (obj && (typeof obj === 'object')) {
    if (Array.isArray(obj) && obj.length) {
      for (const arrayItemIndex in obj) {
        obj[arrayItemIndex] = $_recursiveUpdate(obj[arrayItemIndex], options)
      }
      return obj
    } else if ((typeof obj === 'object') && Object.keys(obj).length) {
      const newobj = {}
      for (const key in obj) {
        if (obj[key] && (typeof obj[key] === 'object')) newobj[key] = $_recursiveUpdate(obj[key], options)
        else {
          if ((obj[key] && typeof obj[key] === 'string')) {
            if (moment(obj[key], 'YYYY-MM-DDTHH:mm:ss', true).isValid()) {
              if (options.toServerTz) {
                const date = momentTz(obj[key], 'YYYY-MM-DDTHH:mm:ss').tz(options.userTz)
                newobj[key] = momentTz(date).tz(options.serverTz).format('YYYY-MM-DDTHH:mm:ss')
              } else newobj[key] = obj[key]
            } else newobj[key] = obj[key]
          } else newobj[key] = obj[key]
        }
      }
      return newobj
    } else return obj
  } else return obj
}

module.exports = (req, res, next) => {
  const userTz = req.headers['x-timezone'] || 'Asia/Kolkata'
  const serverTz = global.serverTz || Intl.DateTimeFormat().resolvedOptions().timeZone

  req.body = $_recursiveUpdate(req.body, {
    toServerTz: true,
    serverTz,
    userTz,
  })

  next()
}