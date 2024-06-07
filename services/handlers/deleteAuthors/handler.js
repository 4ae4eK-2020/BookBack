const pool = require('../../pool').pool

async function DeleteAuthors(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'DeleteAuthors'
    const client = await pool.connect()

    try {
        await client.query(`DELETE FROM "Authors" WHERE "Authors".id = $1`, [ object.id ])
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
    DeleteAuthors: DeleteAuthors,
}