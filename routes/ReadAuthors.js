const { ReadAllAuthors } = require("../services/handlers/readAllAuthors/handler")
const { readAuthorsById } = require("../services/handlers/readAuthorsById/handler")

module.exports = function (fastify, opts, next) {
    fastify.route({
        url: '/readAuthor',
        method: 'GET',
        schema: {
        },
        async handler(request, reply){
            const data = await ReadAllAuthors(request.body)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()

    fastify.route({
        url: '/readAuthor/:id',
        method: 'GET',
        schema: {
        },
        async handler(request, reply){
            const data = await readAuthorsById(request.params)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()
}