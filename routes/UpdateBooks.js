const { UpdateBooks } = require("../services/handlers/updateBooks/handler")

module.exports = function (fastify, opts, next) {
    fastify.route({
        url: '/updateBooks',
        method: 'PUT',
        schema: {
            id: "integer",
            name: "string"
        },
        async handler(request, reply){
            const data = await UpdateBooks(request.body)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()
}