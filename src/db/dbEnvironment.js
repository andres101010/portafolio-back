require("dotenv").config()

const DB_HOST = process.env.MYSQL_ADDON_HOST;
const DB_USER = process.env.MYSQL_ADDON_USER;
const DB_PASSWORD = process.env.MYSQL_ADDON_PASSWORD;
const DB_NAME = process.env.MYSQL_ADDON_DB;
const DB_PORT = process.env.MYSQL_ADDON_PORT;

module.exports = {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT
 }