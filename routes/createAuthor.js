const { CreateAuthor } = require('../services/handlers/createAuthor/handler')

module.exports = function (fastify, opts, next) {
    fastify.route({
        url: '/createAuthor',
        method: 'POST',
        schema: {
            name: "string",
            required: ["name"]
        },
        async handler(request, reply){
            const data = await CreateAuthor(request.body)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()
}