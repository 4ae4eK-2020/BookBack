const pool = require('../../pool').pool

async function CreateBook(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'CreateBook'
    const client = await pool.connect()

    try {
        const authorId = await client.query(`SELECT id FROM "Authors" WHERE name = $1`, [ object.author ])
        if (authorId.rows) {
            const newBookId = await client.query(`INSERT INTO "Books" (name) VALUES ($1) RETURNING id`, [ object.name ])
            await client.query(`INSERT INTO "AuthorsBooks" (book_id, author_id) VALUES ($1, $2)`, [ newBookId.rows[0].id, authorId.rows[0].id ])
            data.message = "success"
            data.statusCode = 200
        } else {
            data.message = "Такого автора не существует в моей базе"
        }
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
    CreateBook: CreateBook,
}