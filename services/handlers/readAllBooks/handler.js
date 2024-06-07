const pool = require('../../pool').pool

async function ReadAllBooks(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'ReadAllBooks'
    const client = await pool.connect()

    try {
        const books = await client.query(`SELECT "Books".name AS "title", "Authors".name AS "author" FROM "Books"
                            LEFT JOIN "AuthorsBooks" ON "Books".id = "AuthorsBooks".book_id
                            LEFT JOIN "Authors" ON "AuthorsBooks".author_id = "Authors".id`)

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
    ReadAllBooks: ReadAllBooks,
}