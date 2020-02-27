// const RegsiterValidation = document.getElementById('RegsiterValidation');

const name = document.forms['RegsiterValidation']['name']
const username = document.forms['RegsiterValidation']['username']
const email = document.forms['RegsiterValidation']['email']
const password = document.forms['RegsiterValidation']['password']
const confpassword = document.forms['RegsiterValidation']['confpassword']

const name_error = document.getElementById('name_error')
const username_error = document.getElementById('username_error')
const email_error = document.getElementById('email_error')
const password_error = document.getElementById('password_error')
const confpassword_error = document.getElementById('confpassword_error')

// Event
name.addEventListener('blur', nameVerify, true);

const illegalChars = /^\w+$/; // allow letters, numbers, and underscores
const emailValid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

// toggle text and password field
function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}



function Validate() {
    if(name.value === '') {
        name.style.border = "1px solid red"
        name_error.textContent = "Name is required"
        document.getElementById('name_label').style.color = "red";
        name.focus();
        return false;
    }
    
    if(!onlyAlphabet.test(name.value)) {
        name.style.border = "1px solid red"
        name_error.textContent = "Name must be alphabet only"
        document.getElementById('name_label').style.color = "red";
        name.focus();
        return false;
    }
    
    if((name.value).length < 5 || (name.value).length > 15) {
        name.style.border = "1px solid red"
        name_error.textContent = "Name contain 5 to 15 characters only"
        document.getElementById('name_label').style.color = "red";
        name.focus();
        return false;
    }

    if(username.value === '') {
        username.style.border = "1px solid red"
        username_error.textContent = "Username is required"
        document.getElementById('username_label').style.color = "red";
        username.focus();
        return false;
    }

    // if(!illegalChars.test(username.value)) {
    //     username.style.border = "1px solid red"
    //     username_error.textContent = "Username must be alphanumeric and underscore only"
    //     document.getElementById('username_label').style.color = "red";
    //     username.focus();
    //     return false;
    // }
    
    // if((username.value).length < 5 || (username.value).length > 15) {
    //     username.style.border = "1px solid red"
    //     username_error.textContent = "Username contain 5 to 15 characters only"
    //     document.getElementById('username_label').style.color = "red";
    //     username.focus();
    //     return false;
    // }


    if(password.value !== confpassword.value) {
        confpassword.style.border = "1px solid red"
        confpassword_error.textContent = "Confirm password match"
        document.getElementById('confpassword_label').style.color = "red";
        confpassword.focus();
        return false;
    }
}

function nameVerify() {
    if (name.value != "") {
        name.style.border = "1px solid #5e6e66";
        document.getElementById('name_label').style.color = "#5e6e66";
        document.getElementById('name_error').style.color = "#5e6e66";
        name_error.innerHTML = "";
        return true;
    }
  }