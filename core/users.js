// const db = require('../config/db');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

module.exports =  {
    activity : (req, res) => {

        let date = new Date(),
        getFullYear = date.getFullYear(),
        getMonth = date.getMonth(),
        getDay = date.getDate(),

        regsiter_date = `${getFullYear}-${getMonth + 1}-${getDay}`;

        let confirmpass = req.body.confirmpass;
    
       
    
        let registerUser = "INSERT INTO `Users` (email, username, password, name, date_created) VALUES(?, ?, ?, ?, ?) ";
        let searchUser = "SELECT username FROM `Users` WHERE username = ? ";

        let registerfieldName = [req.body.name, req.body.username, req.body.email, req.body.password, regsiter_date]


        db.query(searchUser, [req.body], (err, results) => {
            if(!err) {
                res.redirect('/users/user_reister');
            } else {
                if(err.code == 'ER_PARSE_ERROR') {
                    
                    handleValidationError(err, req.body);
                    res.render('layouts/registration', {
                        title: 'Register Page',
                        getallFormValue: req.body,
                    });
                } else {

                    res.redirect('/users/user_reister')
                    console.log("Error while updating: ");
                }
            }

        });
/*         db.query(registerUser, registerfieldName, (err, results) => {

            if(!err) {
                res.redirect('/users/user_login');
              
            } else {

                if(err.code == 'ER_BAD_NULL_ERROR') {
                    handleValidationError(err, req.body);
                    res.render('layouts/registration', {
                        title: '',
                        getallFormValue: req.body,
                    })
    
                } else {
                    console.log('error in database' + err)
                }
            }
        }); */

    }
}

function handleValidationError (err, body) {
    
    if (Object.keys(body).every(function(x) { return body[x]===''|| body[x]===null;}) === false) {
         console.log()
    } else {
        for(let field in body) {

            console.log(body[field].name)
            switch (field) {
                case 'name': 
                    body['nameError'] = "Name is required";
                    break;
                case 'username': 
                    body['usernameError'] = "Username is required";
                    break;
                case 'email': 
                    body['emailError'] = "Email is required";
                    break;
                case 'password': 
                    body['passwordError'] = "Password is required";
                    break;
                case 'confirmpass': 
                    body['confirmpassError'] = "Confirm password is required";
                    break;
                default:
                    break;
            }
        }
     }
}


// exports.activity=activity;