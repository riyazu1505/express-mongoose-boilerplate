const userSchema = require('../../schemas/users')
const { dbmodel } = require('../../config/dbconfig')

module.exports = ({ server }) => {
  const iO = require('socket.io')(server, {
    cors: { origin: true }
  })

  iO.on('connection', (socket) => {
    console.log(socket.id, 'inside socket.io')

    socket.on('login', async ({ _id } = {}) => {
      socket.userDetails = { _id }
      // socket.join(tenant)
      await dbmodel(userSchema).findByIdAndUpdate(_id, { socketId: socket.id }).catch((err) => { throw err })
      // updateActiveUsers({ _id })
    })

    socket.on('updateSocketId', async ({ _id } = {}) => {
      socket.userDetails = { _id }
      // socket.join(tenant)
      await dbmodel(userSchema).findByIdAndUpdate(_id, { socketId: socket.id }).catch((err) => { throw err })
      // updateActiveUsers({ _id })
    })

    socket.on('logout', async ({ _id }) => {
      if (!_id) return
      // socket.leave(tenant)
      await dbmodel(userSchema).findByIdAndUpdate(_id, { socketId: null }).catch((err) => { throw err })
      // updateActiveUsers({ _id })
    })

    socket.on('disconnect', async () => {
      const { userDetails } = socket
      if (!userDetails || !userDetails._id) return
      await dbmodel(userSchema).findByIdAndUpdate(userDetails._id, { socketId: null }).catch((err) => { throw err })
      // updateActiveUsers(userDetails)
      // socket.leave(userDetails.tenant)
    })
  })

  const updateActiveUsers = async ({ tenant } = {}) => {
    // const users = await dbmodel(userSchema).find({ socketId: { $ne: null } }, 'formdata email profile role socketId').lean().catch((err) => { throw err })
    // iO.sockets.to(tenant).emit('activeUsers', users)
  }
}
