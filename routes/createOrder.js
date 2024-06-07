const { CreateOrder } = require('../services/handlers/createOrder/handler')

module.exports = function (fastify, opts, next) {
    fastify.route({
        url: '/createOrder',
        method: 'POST',
        schema: {
            user_id: "integer"
        },
        async handler(request, reply){
            const data = await CreateOrder(request.body)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()
}