require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const ejs = require('ejs');
const flash = require('connect-flash');

const keys = require('./config/keys');
const mysqlDB = require('./config/db/db').mysqlDB();
// const mongoDB = require('./config/db/db').mongoDB();

const app = express();


// Configure middleware
app.use(express.static('./public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
	secret: 'some awsome word',
	resave: false,
    saveUninitialized: false,
    // cookie: {
    //     maxAge: 60 * 1000 * 30
    // }
}));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Connect flash
app.use(flash());

// Global Vairables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users-routes'));


app.listen(keys.PORT, (err) => {
    console.log(`Server is running on PORT: ${keys.PORT}`);
});
