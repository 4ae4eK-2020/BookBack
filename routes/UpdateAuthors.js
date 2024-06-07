const { UpdateAuthors } = require("../services/handlers/updateAuthors/handler")

module.exports = function (fastify, opts, next) {
    fastify.route({
        url: '/updateAuthors',
        method: 'PUT',
        schema: {
            id: "integer",
            name: "string"
        },
        async handler(request, reply){
            const data = await UpdateAuthors(request.body)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()
}