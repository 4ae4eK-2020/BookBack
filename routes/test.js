const { test, Test} = require('../services/handlers/test/handler')

module.exports = function (fastify, opts, next) {
    fastify.route({
        url: '/',
        method: 'GET',
        schema: {

        },
        async handler(request, reply){
            const data = await Test(request.body)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()
}