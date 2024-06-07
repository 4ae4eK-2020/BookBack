const pool = require('../../pool').pool

async function CreateAuthor(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'CreateAuthor'
    const client = await pool.connect()

    try {
        await client.query(`INSERT INTO "Authors" (name) VALUES ($1);`, [ object.name ])

        data.message = "success"
        data.statusCode = 200
    } catch (err) {
        console.log(`${ funcName }: CATCH ERROR`);
        console.log(err.message, err.stack);
    } finally {
        client.release();
        console.log(`${ funcName }: client release()`);
    }

    return data
}

module.exports = {
    CreateAuthor: CreateAuthor,
}