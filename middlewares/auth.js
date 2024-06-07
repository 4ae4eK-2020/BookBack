require('dotenv').config()

async function Auth(request, reply) {
    if(['GET','HEAD'].includes(request.method)) 
        return
    const apiKey = request.headers['x-api-key']
    const knownKey = process.env.APIKEY

    if(!apiKey || apiKey !== knownKey) {
        return reply.code(401).send("Unauthorized")
    }
}

module.exports = Auth