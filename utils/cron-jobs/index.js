const { Worker } = require('worker_threads')
const path = require('path')

// Database backup worker
new Worker(path.join(__dirname, 'db-backup.js'), { workerData: {} })
