const pool = require('../../pool').pool

async function ReadAllReviews(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'ReadAllReviews'
    const client = await pool.connect()

    try {
        const reviews = await client.query(`SELECT "text", "name" FROM "Reviews"
                                        LEFT JOIN "Users" ON "Users".id = user_id`)

        data.message = reviews.rows
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
    ReadAllReviews: ReadAllReviews,
}