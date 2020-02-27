const mysql = require('mysql');
const mongoose = require('mongoose');
const keys = require('../keys');

module.exports = {
    mysqlDB: function() {
        const mysqlDB = mysql.createPool({
            connectionLimit: 10,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_MYSQL_NAME
        });
        
        mysqlDB.getConnection((err) => {
            if(err) throw err;
            else console.log('Connected to MYSQL database..');
        });

        global.mysqlDB = mysqlDB;
    },

    mongoDB: function() {
        mongoose.connect(
            keys.mongoURI,
            { 
                useUnifiedTopology: true,
                useNewUrlParser: true
             },
            (err) => {
                if (err) throw err;
                else console.log('Connected to MongoDB: ...');
            }
        )
        global.mongoDB = mongoDB;
    }
}

