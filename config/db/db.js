const mysql = require('mysql');
const mongoose = require('mongoose');
const keys = require('../keys');

module.exports = {
    mysqlDB: function() {
        const mysqlDB = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'social'
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

