require('dotenv').config();
const mysql = require('mysql');

const password = process.env.DATABASE_PASS;
const host = process.env.DATABASE_HOST;
const user = process.env.DATABASE_USER;
const database = process.env.DATABASE_NAME;

const dbconnection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

dbconnection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = dbconnection;
