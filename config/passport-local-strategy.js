const passport = require('passport');
console.log('passport is loaded now');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done){  // email and password are automatically passed
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  {
            if (err){
                // console.log('Error in finding user --> Passport');
                return done(err);
            }

            // console.log(`############## ${user}`);
            if (!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);  // returned to failureRedirect in users.js
            }

            return done(null, user);  // user is returned to passport.serializeUser()
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    // console.log(`************** ${user}`);
    // console.log(user.id, 'and   ', user._id);  // both are same
    done(null, user.id);   // user.id is sent to session in index.js to encript cookie
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});


// Check if the user is authenticated   (We are here creating our own middleware)
passport.checkAuthentication = function(req, res, next){
    // If the user is signed in, then pass the request to the next function (controller's action)
    if (req.isAuthenticated()){  // isAuthenticated() is created by passport
        return next();
    }

    // if user is not signed in 
    return res.redirect('/users/auth');
}


passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
        // whenever a user is signed in, his/her information is available is req.user (b/c we have used user model)
        // req.user is already handled by passport but it is not sent to res.locals
        // Therefore we need to transfer it from there to use it in rendering the user's page

    }
    next();
}


module.exports = passport;