const { CreateBook } = require('../services/handlers/createBook/handler')

module.exports = function (fastify, opts, next) {
    fastify.route({
        url: '/createBook',
        method: 'POST',
        schema: {
            name: "string",
            author: "string",
            required: ["name", "author"]
        },
        async handler(request, reply){
            const data = await CreateBook(request.body)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()
}