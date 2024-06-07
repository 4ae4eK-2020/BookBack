const pool = require('../../pool').pool

async function readAuthorsById(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'readAuthorsById'
    const client = await pool.connect()

    try {
        const books = await client.query(`SELECT name AS "author", FROM "Authors" WHERE "Authors".id = $1`, [ object.id ])

        data.message = books.rows
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
    readAuthorsById: readAuthorsById,
}