const BD_HOST = process.env.BD_HOST || 'localhost';
const BD_USER = process.env.BD_USER || 'root';
const BD_PASSWORD = process.env.PASSWORD || 'root';
const BD_NAME = process.env.BD_NAME || 'portafolio';
const BD_PORT = process.env.BD_PORT || '3306';

module.exports = {
    BD_HOST,
    BD_USER,
    BD_PASSWORD,
    BD_NAME,
    BD_PORT,
};