const fs = require('fs')
const path = require('path')

exports.createFileRecursively = (dirpath) => {
  if (!fs.existsSync(dirpath)) fs.mkdirSync(dirpath, { recursive: true })
}
