const dbEnvironment = require("./dbEnvironment")
const mysql = require("mysql2")
module.exports = {
    connection: mysql.createPool({
        host     : dbEnvironment.DB_HOST,
        user     : dbEnvironment.DB_USER,
        password : dbEnvironment.DB_PASSWORD,
        database : dbEnvironment.DB_NAME,
        port: dbEnvironment.DB_PORT
    })
}