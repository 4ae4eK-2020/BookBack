const { AddBook } = require('../services/handlers/addBook/handler')

module.exports = function (fastify, opts, next) {
    fastify.route({
        url: '/addBook',
        method: 'POST',
        schema: {
            order_id: "integer",
            book_id: "integer"

        },
        async handler(request, reply){
            const data = await AddBook(request.body)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()
}