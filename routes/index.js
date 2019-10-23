const express = require('express');
const router = express.Router();



router.get('/',  (req, res) => {
    res.render('layouts/welcome', {
        title: 'Welcome Page'
    });
});

/* router.all('*', (req, res, next) => {
    res.render('middleware/error_page.ejs', {
        title: 'Page not found'
    });
}); */



module.exports = router;