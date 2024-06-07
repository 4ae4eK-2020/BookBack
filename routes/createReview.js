const { CreateReview } = require('../services/handlers/createReview/handler')

module.exports = function (fastify, opts, next) {
    fastify.route({
        url: '/createReview',
        method: 'POST',
        schema: {
            user_id: "integer",
            review: "string"
        },
        async handler(request, reply){
            const data = await CreateReview(request.body)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()
}