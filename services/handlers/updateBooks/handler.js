const pool = require('../../pool').pool

async function UpdateBooks(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'UpdateBooks'
    const client = await pool.connect()

    try {
        const author = await client.query(`SELECT id FROM "Authors" WHERE "name" = $1`, [ object.author ])
        await client.query(`UPDATE "Books" SET "name" = $1 WHERE "Books".id = $2`, [ object.name, object.id ])
        await client.query(`UPDATE "AuthorsBooks" SET "author_id" = $1 WHERE "book_id" = $2`, [ author.rows[0].id, object.id ])

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
    UpdateBooks: UpdateBooks,
}