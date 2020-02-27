const express = require('express');

module.exports = {

    // Registration Validation
    registrationValidator: (err, body, results) => {

        // validation checking
        // const phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        const illegalChars = /^\w+$/; // allow letters, numbers, and underscores
        const emailValid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const onlyAlphabet = /^[a-zA-Z]+$/;

        for (let field in body) {

            if (body.name == "") { // name field valildation
                body['nameError'] = "Name is required";
                
            } else if (!onlyAlphabet.test(body.name)) {

                body['nameError'] = "Name must be alphabet only";
            } else if ((body.name).length < 5 || (body.username).length > 15) {

                body['nameError'] = "Name reange min: 5 and max: 15";
            }
            
            if (body.username == "") { // username field validation 
                body['usernameError'] = "Username is required";

            } else if (results.length > 0) { 
                body['usernameError'] = "Username already exists";

            } else if (!illegalChars.test(body.username)) {
                body['usernameError'] = "Username must be alphanumeric";

            } else if ((body.username).length < 5 || (body.username).length > 15) {
                body['usernameError'] = "Username reange min: 5 and max: 15";

            }

            if (body.email == "") { // email field validation
                body['emailError'] = "Email is required";

            } else if (!emailValid.test(body.email)) { 
                body['emailError'] = "Not a valid email";

            }

            if (body.password == "") { // password validation
                body['passwordError'] = "Password is required";

            } else if ((body.password).length <= 5) {
                body['passwordError'] = "Password should be min: 5";

            } 

            if (body.confpassword == "" || (body.confpassword).length <= 5) {
                body['confirmpassError'] = "Confrim password is required";
            } else {
                body['confirmpassError'] = "Password not match";
            }
        }

    },


    // Login Validation
    loginValidator: (err, body, results) => {
        if(body.username == "") {
            body['usernameError'] = "Enter your username";
        } else if (results.length > 0 && (body.password !== results[0].password)) { 
            console.log(results[0].username)
            body['passwordError'] = "Password not match";
        } else {
            body['usernameError'] = "Incorrect username";
        }
        
        if(body.password == "") {
            body['passwordError'] = "Enter your password";
        } 
    }

}