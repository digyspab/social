// const db = require('../config/db');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const regsitrationValidator = require('./validator');

module.exports = {
    activity: (req, res) => {

        // validation checking
        const illegalChars = /^\w+$/; // allow letters, numbers, and underscores
        const emailValid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        // get recent date
        let date = new Date(),
            getFullYear = date.getFullYear(),
            getMonth = date.getMonth(),
            getDay = date.getDate(),

            regsiter_date = `${getFullYear}-${getMonth + 1}-${getDay}`;

        let registerUser = "INSERT INTO `Users` (email, username, password, name, date_created) VALUES(?, ?, ?, ?, ?) ";
        let searchUser = "SELECT username FROM `Users` WHERE username = ? ";

        let registerfieldName = [req.body.name, req.body.username, req.body.email, req.body.password, regsiter_date];




        db.query(searchUser, [req.body], (err, resultsWithBody) => {

            if (err.code == 'ER_PARSE_ERROR') {
                
                db.query(searchUser, [req.body.username], (err, results) => {
                    
                    if(results.length > 0 || req.body.name == "" || req.body.email == "" || req.body.password == "" || req.body.confirmpass == "") {
                        regsitrationValidator.handleValidationError(err, req.body, results); // validation function
                        res.render('layouts/registration', {
                            title: 'Register Page',
                            getallFormValue: req.body,
                        });
                    } else {
                        res.redirect('/users/user_login')
                    }
                });
            } 
            
            else {

                res.redirect('/users/user_reister')
                console.log("Error while updating: ");
            }
        });
    }
}

// exports.activity=activity;