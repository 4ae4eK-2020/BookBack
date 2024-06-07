const { CreateUser } = require('../services/handlers/createUser/handler')

module.exports = function (fastify, opts, next) {
    fastify.route({
        url: '/createUser',
        method: 'POST',
        schema: {
            name: 'string',
            password: "string",
            required: ["name" , "password"]
        },
        async handler(request, reply){
            const data = await CreateUser(request.body)
            reply.status(data.statusCode)
            reply.send(data.message)
        }
    })

    next()
}