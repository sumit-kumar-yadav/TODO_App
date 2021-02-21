

//require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/TODO_db', {useNewUrlParser: true, useUnifiedTopology: true});


//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
// db.on('error', function(err) { console.log(err.message); });
db.on('error', console.error.bind(console, 'connection error:'));


//up and running then print the message
db.once('open', function() {
  
    console.log("Successfully connected to the database");

});

// module.exports = db;