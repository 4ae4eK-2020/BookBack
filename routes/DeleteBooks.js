const { DeleteBooks } = require("../services/handlers/deleteBooks/handler")

module.exports = function (fastify, opts, next) {
    fastify.route({
        url: '/deleteBooks',
        method: 'DELETE',
        schema: {
            id: "integer"
        },
        async handler(request, reply){
            const data = await DeleteBooks(request.body)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()
}