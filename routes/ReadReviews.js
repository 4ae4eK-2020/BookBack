const { ReadAllReviews } = require("../services/handlers/readAllReviews/handler")
const { ReadReviewsById } = require("../services/handlers/readReviewsById/handler")

module.exports = function (fastify, opts, next) {
    fastify.route({
        url: '/readReview',
        method: 'GET',
        schema: {
        },
        async handler(request, reply){
            const data = await ReadAllReviews(request.body)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()

    fastify.route({
        url: '/readReview/:id',
        method: 'GET',
        schema: {
        },
        async handler(request, reply){
            const data = await ReadReviewsById(request.params)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()
}