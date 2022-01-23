require('dotenv').config()   // For heroku

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

// mongoose to db connection
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo').default;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');


// Express parser to parse the form data into js object
app.use(express.urlencoded());

app.use(cookieParser());

// Accessing the static files like css, js 
app.use(express.static('./assets'));

// Setting layouts for our page
app.use(expressLayouts);

// Extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo-session is used to store the session cookie iin the db
app.use(session({
    name: 'TODO',
    // TODO change the secret before deployment in production mode
    secret: 'changeItLaterOn',
    saveUninitialized: false,    
    resave: false,  // Don't save same data again and again
    cookie: {   // Timeout of the session in millisec, 
        maxAge: (1000 * 60 * 1000)
    },
    store: MongoStore.create(
        {
            mongoUrl: process.env.MONGODB_URL,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo setup ok');
        })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Root router
app.use('/', require('./routes/index.js'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});