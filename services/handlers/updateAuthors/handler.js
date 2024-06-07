const pool = require('../../pool').pool

async function UpdateAuthors(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'UpdateAuthors'
    const client = await pool.connect()

    try {
        await client.query(`UPDATE "Authors" SET "name" = $1 WHERE "Authors".id = $2`, [ object.name, object.id ])
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
    UpdateAuthors: UpdateAuthors,
}