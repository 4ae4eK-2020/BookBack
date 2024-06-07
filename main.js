require('dotenv').config()

const autoload = require('@fastify/autoload')
const path = require('path')
const auth = require('./middlewares/auth')
const fastify = require('fastify')({
    logger: true
})

fastify.register(autoload, {
    dir:path.join(__dirname, './routes'),
})

fastify.addHook("preHandler", auth)

const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
        console.log('\nServer started')
    } catch (err) {
        console.log('start_server_error', err);
        process.exit(1);
    }
}

start()
