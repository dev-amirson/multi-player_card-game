const socket = require('socket.io')
let io

const attach = (server) => {
    if (io) {
        throw new Error('Socket server already attached')
    }
    io = socket(server, {
        pingTimeout: 1200000,
        cors: {
            origin: process.env.CLIENT_URL
        }
    })
    io.sockets.on('connection', async (socket) => {
        console.log('listening',socket.id)
        io.id = Math.random().toString(36).substr(2, 9)
        // START: Below code is for testing you can remove it
        // socket.on('Testing_Socket', (data) => {
        //     console.log(`Received message from client: ${data}`)
        // })
        // socket.emit('Testing_Socket_Verified', 'Verified its working')
        // END
    })
}

const getIO = () => {
    if (!io) {
        throw new Error('Socket not initialized')
    }

    return io
}
module.exports = {
    attach,
    getIO
}
