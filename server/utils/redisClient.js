const { createClient } = require('redis')
const redisConfig = require('../config/redis')


const client = createClient({
    password: redisConfig.password,
    socket: {
        host: redisConfig.host,
        port: redisConfig.port
    }
})

client.connect()

client.on('connect', () => {
    // console.log("Connected Reddis")
})

client.on('error', (err) => {
    // console.error("Strings.redisError, err")
})
module.exports = client
