const { DeleteAuthors } = require("../services/handlers/deleteAuthors/handler")

module.exports = function (fastify, opts, next) {
    fastify.route({
        url: '/deleteAuthors',
        method: 'DELETE',
        schema: {
            id: "integer"
        },
        async handler(request, reply){
            const data = await DeleteAuthors(request.body)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()
}