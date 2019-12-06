const express = require('express');


module.exports = {
    handleValidationError: (err, body, results) => {

        // validation checking
        // const phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        const illegalChars = /^\w+$/; // allow letters, numbers, and underscores
        const emailValid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        const onlyAlphabet = /^[a-zA-Z]+$/;

        for (let field in body) {
            if (Object.values(body)[0] == "") { // name field valildation
                switch (field) {
                    case 'name':
                        body['nameError'] = "Name is required";
                        break;
                    default:
                        break;
                }
            } 

            // if (!onlyAlphabet.test(body.name)) { // name field valildation
            //     switch (field) {
            //         case 'name':
            //             body['nameError'] = "Only alphabets";
            //             break;
            //         default:
            //             break;
            //     }
            // }
            
            if (Object.values(body)[1] == "") { // username field validation 
                switch (field) {
                    case 'username':
                        body['usernameError'] = "Username is required";
                        break;
                    default:
                        break;
                }
            } else if (results.length > 0) { 
                switch (field) {
                    case 'username':
                        body['usernameError'] = "Username already exists";
                        break;
                    default:
                        break;
                }
            } else if (!illegalChars.test(body.username)) {
                switch (field) {
                    case 'username':    
                        body['usernameError'] = "Username must be alphanumeric";
                        break;
                    default:
                        break;
                }
            } else if ((body.username).length < 5 || (body.username).length > 15) {
                switch (field) {
                    case 'username':
                        body['usernameError'] = "Username reange min: 5 and max: 15";
                        break;
                    default:
                        break;
                }
            }

            if (Object.values(body)[2] == "") { // email field validation
                switch (field) {
                    case 'email':
                        body['emailError'] = "Email is required";
                        break;
                    default:
                        break;
                }
            } else if (!emailValid.test(body.email)) { // email field validation
                switch (field) {
                    case 'email':
                        body['emailError'] = "Not a valid email";
                        break;
                    default:
                        break;
                }
            }
            
            if (Object.values(body)[3] == "") { // password validation
                switch (field) {
                    case 'password':
                        body['passwordError'] = "Password is required";
                        break;
                    default:
                        break;
                }
            } else if ((body.password).length <= 5) { // password validation
                switch (field) {
                    case 'password':
                        body['passwordError'] = "Password should be min: 5";
                        break;
                    default:
                        break;
                }
            }
            
            if (Object.values(body)[3] !== Object.values(body)[4]) {
                switch (field) {
                    case 'confirmpass':
                        body['confirmpassError'] = "Password not match";
                        break;
                    default:
                        break;
                }
            }
        }

    }
}