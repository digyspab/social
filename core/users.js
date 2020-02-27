const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const jwt = require('jsonwebtoken');


const formValidator = require('./validator');

module.exports = {

/* ********************************************** 
                user register logic
   ******************************************* */
    userRegister: (req, res, next) => {

        // get recent date
        let date = new Date(),
            getFullYear = date.getFullYear(),
            getMonth = date.getMonth(),
            getDay = date.getDate(),

            regsiter_date = `${getFullYear}-${getMonth + 1}-${getDay}`;

        let registerUser = "INSERT INTO `Users` (email, username, password, name, date_created) VALUES(?, ?, ?, ?, ?) ";
        let searchUser = "SELECT username FROM `Users` WHERE username = ? ";

        let name = req.body.name.toLocaleLowerCase(),
            username = req.body.username.toLocaleLowerCase(),
            email = req.body.email.toLocaleLowerCase();


        mysqlDB.query(searchUser, [req.body], (err, resultsWithBody) => {

            if (err.code == 'ER_PARSE_ERROR') {
                
                mysqlDB.query(searchUser, [req.body.username], (err, results) => {
                    
                    if(results.length > 0 || req.body.name == "" || req.body.username == "" || req.body.email == "" || req.body.password == "" || req.body.confpassword == "") {
                        formValidator.registrationValidator(err, req.body, results); // validation function
                        res.render('layouts/registration', {
                            title: 'Register Page',
                            getallFormValue: req.body,
                        });
                    } else {

                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(req.body.password, salt, (err, hash) => {
                                mysqlDB.query(registerUser, [email, username, hash, name, regsiter_date ], (err, registerResult) => {
                                    // JWT TOKEN
                                    // const token = jwt.sign({ id: registerResult.user_id}, process.env.JWT_SECRET, { expiresIn: 86400 });
                                    req.flash('success_msg', 'You can login')
                                    res.redirect('/users/user_login');
                                });
                            });
                        });
                    }
                });
            } else {

                res.redirect('/users/user_reister')
            }
        });
    },

/* ********************************************** 
                user login logic
   ******************************************* */
    userLogin: (req, res, next) => {

        let userLogin = "SELECT * FROM `Users` WHERE username = ? ";

        mysqlDB.query(userLogin, [req.body.username], (err, results) => {
            if (err) {
                res.json({
                    status: false,
                    message: 'there are some error with query'
                })
            } else {
                if (results.length > 0) {
                    bcrypt.compare(req.body.password, results[0].password, (err, resBcrypt) => {
                        if (!resBcrypt) {
                            formValidator.loginValidator(err, req.body, results);

                            res.render('layouts/login', {
                                title: 'Login Page',
                                getallFormValue: req.body, token
                            });
                        } else {

                            console.log(results);
                            const token = jwt.sign({ user_id: results }, process.env.JWT_SECRET, {  expiresIn: 86400 });
                            console.log(token);

                            req.flash('success_msg', 'Hi user');
                            res.redirect('/users/user_profile');
                        }
                    });
                } else {
                    formValidator.loginValidator(err, req.body, results);
                    res.render('layouts/login', {
                        title: 'Login Page',
                        getallFormValue: req.body
                    });
                }
    
            }
        });
    }
}
