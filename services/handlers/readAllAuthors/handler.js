const pool = require('../../pool').pool

async function ReadAllAuthors(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'ReadAllAuthors'
    const client = await pool.connect()

    try {
        const books = await client.query(`SELECT name AS "author", FROM "Authors"`)

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
    ReadAllAuthors: ReadAllAuthors,
}