const pool = require('../../pool').pool

async function AddBook(object) {
    const data = {
        message: 'error',
        statusCode: 400
    }

    const funcName = 'addBook'
    const client = await pool.connect()

    try {
        const book = await client.query(`SELECT * FROM "Books" WHERE "id" = $1`, [ object.book_id ])
        if (book.rows.length == 0) {
            data.message = "Такой книги не существует в боей базе"
            data.statusCode = 404
            return data
        }
        const order = await client.query(`SELECT * FROM "Orders" WHERE "id" = $1`, [ object.order_id ]) 
        if (order.rows.length == 0) {
            data.message = "Такого заказа не существует в боей базе"
            data.statusCode = 404
            return data
        }
        await client.query(`INSERT INTO "BooksOrders" ("book_id", "order_id") VALUES($1, $2)`, [ object.book_id, object.order_id ])

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
    AddBook: AddBook,
}