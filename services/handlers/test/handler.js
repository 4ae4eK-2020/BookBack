const pool = require('../../pool').pool

async function Test(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'Test'
    const client = await pool.connect()

    try {
        data.message = "connected"
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
    Test: Test,
}