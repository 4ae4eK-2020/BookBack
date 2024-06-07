const pool = require('../../pool').pool

async function CreateReview(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'CreateReview'
    const client = await pool.connect()

    try {
        const user_id = await client.query(`SELECT name FROM "Users" WHERE id = $1`, [ object.user_id ])
        if (user_id.rows.length == 0) {
            data.message = "Такого пользователя нет в моей базе"
            data.statusCode = 404
            return data
        }
        await client.query(`INSERT INTO "Reviews" ("user_id", "text") VALUES($1, $2)`, [ object.user_id, object.review ])

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
    CreateReview: CreateReview,
}