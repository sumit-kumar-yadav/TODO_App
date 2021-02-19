const express = require('express');
const port = 8000;

const app = express();

// Accessing the static files like css, js 
app.use(express.static('assets'));

// use express router
app.use('/', require('./routes/index.js'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});