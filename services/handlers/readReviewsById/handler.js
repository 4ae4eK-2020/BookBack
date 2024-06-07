const pool = require('../../pool').pool

async function ReadReviewsById(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'ReadBooksById'
    const client = await pool.connect()

    try {
        const review = await client.query(`SELECT "text" FROM "Reviews" WHERE "Reviews".id = $1`, [ object.id ])

        data.message = review.rows
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
    ReadReviewsById: ReadReviewsById,
}