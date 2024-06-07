const pool = require('../../pool').pool

async function DeleteBooks(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'DeleteBooks'
    const client = await pool.connect()

    try {
        await client.query(`DELETE FROM "Books" WHERE "Books".id = $1`, [ object.id ])
        await client.query(`DELETE FROM "AuthorsBooks" WHERE "book_id" = $1`, [ object.id ])

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
    DeleteBooks: DeleteBooks,
}