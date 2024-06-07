const pool = require('../../pool').pool

async function ReadBooksById(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'ReadBooksById'
    const client = await pool.connect()

    try {
        const books = await client.query(`SELECT "Books".name, "Authors".name AS "author" FROM "Books"
                            INNER JOIN "Authors" ON "Authors".id = "Books".author_id WHERE "Books".id = $1`, [ object.id ])

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
    ReadBooksById: ReadBooksById,
}