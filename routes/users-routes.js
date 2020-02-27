const express = require('express');
const router = express.Router();
const users_activity = require('../core/users');


/* ********************************************** 
                user login
   ******************************************* */
router.get('/user_login', (req, res, next) => {
    res.render('layouts/login', {
        title: 'Login Page',
        getallFormValue: '',
    });
});

router.post('/user_login',  (req, res, next) => {
     users_activity.userLogin(req, res, next);
});


/* ********************************************** 
                user register
   ******************************************* */
router.get('/user_reister', (req, res, next) => {

    res.render('layouts/registration', {
        title: 'Register Page',
        getallFormValue: '',
    });
});

router.post('/user_reister', async (req, res, next) => {

   await users_activity.userRegister(req, res, next);

});

/* ********************************************** 
                user profile
   ******************************************* */
router.get('/user_profile', (req, res, next) => {
    res.render('pages/profile.ejs', {
        title: 'Profile page',
    })
});


module.exports = router;

