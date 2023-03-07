const { job } = require('cron')
const { exec } = require('child_process')
const path = require('path')
const moment = require('moment')
const serverTz = global.serverTz || Intl.DateTimeFormat().resolvedOptions().timeZone



// job('*/15 * * * * *', () => {
//   const outputPath = path.join(__dirname, `/../../backups/${moment().format('YYYY-MM-DD')}/`)
//   // const outputPath = '../../../'

//   const command = `mongodump --db=${process.env.DB_NAME} --gzip`
//   exec(command, (err, stdout, stderr) => {
//     if (err) { return console.log('err: \n', err) }
//     if (stderr) { return console.log('stderr: \n', stderr) }
//   })
// }, null, true, serverTz)

