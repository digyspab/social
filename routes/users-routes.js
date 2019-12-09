const express = require('express');
const router = express.Router();
const users_activity = require('../core/users');


router.get('/user_login',  (req, res, next) => {
    res.render('layouts/login', {
        title: 'Login Page',
        getallFormValue: '',
    });
});

router.get('/user_reister', (req, res, next) => {

    res.render('layouts/registration', {
        title: 'Register Page',
        getallFormValue: '',
    });
});

router.post('/user_reister', (req, res, next) => {
    
   users_activity.activity(req, res, next);

});



module.exports = router;

