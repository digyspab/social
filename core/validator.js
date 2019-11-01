module.exports = {
    handleValidationError: (err, body, results) => {
        // console.log(typeof Object.values(results[0])[0]);
        // console.log(Object.values(results[0])[0] === Object.values(body)[1]);
        // console.log(Object.entries(results[0])[0][1]);
        // console.log(typeof Object.values(body)[1]);
        

        for (let field in body) {
            if (Object.values(body)[0] == "") {
                switch (field) {
                    case 'name':
                        body['nameError'] = "Name is required";
                        break;
                    default:
                        break;
                }
            } 
            
            if (Object.values(body)[1] == "") {
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
            }

            if (Object.values(body)[2] == "") {
                switch (field) {
                    case 'email':
                        body['emailError'] = "Email is required";
                        break;
                    default:
                        break;
                }
            }
            
            if (Object.values(body)[3] == "") {
                switch (field) {
                    case 'password':
                        body['passwordError'] = "Password is required";
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