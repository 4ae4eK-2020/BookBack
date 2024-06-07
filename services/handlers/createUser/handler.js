const pool = require('../../pool').pool
const bcrypt = require('bcryptjs')

async function CreateUser(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'CreateUser'
    const client = await pool.connect()

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(object.password, salt);
        await client.query(`INSERT INTO "Users" (name, password) VALUES ($1, $2);`, [ object.name, hash ])

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
    CreateUser: CreateUser,
}