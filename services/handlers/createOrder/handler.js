const pool = require('../../pool').pool

async function CreateOrder(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'CreateOrder'
    const client = await pool.connect()

    try {
        await client.query(`INSERT INTO "Orders" ("user_id") VALUES($1)`, [ object.user_id ])

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
    CreateOrder: CreateOrder,
}