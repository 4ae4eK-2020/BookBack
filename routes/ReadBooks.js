const { ReadAllBooks } = require('../services/handlers/readAllBooks/handler')
const { ReadBooksById } = require('../services/handlers/readBooksById/handler')

module.exports = function (fastify, opts, next) {
    fastify.route({
        url: '/readBook',
        method: 'GET',
        schema: {
        },
        async handler(request, reply){
            const data = await ReadAllBooks(request.body)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()

    fastify.route({
        url: '/readBook/:id',
        method: 'GET',
        schema: {
        },
        async handler(request, reply){
            const data = await ReadBooksById(request.params)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()
}