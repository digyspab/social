const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'social'
});

db.getConnection((err) => {
    if(err) throw err;
    else console.log('Connected to database..');
});
global.db = db;



module.exports = db;