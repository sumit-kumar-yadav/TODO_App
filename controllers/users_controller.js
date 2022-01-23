const User = require('../models/user');
const TaskList = require('../models/task_list');
const { redirect } = require('express/lib/response');

module.exports.profile = function(req, res){
    if(req.user){
        TaskList.find({user: req.user.id}, function(err, tasksList){
            if(err){
                console.log('Error in fetching the lists');
                return;
            }
    
            return res.render('profile', {
                task_list: tasksList
            });
        });
    }else{
        return redirect('/');
    }
}


// render the sign up page
module.exports.auth = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile')
    }

    return res.render('auth', {
        title: "TODO | auth"
    });
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        console.log('Password is incorrect');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        console.log(user, typeof(user));
        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                console.log(`New user created ${user}`);
                return res.redirect('/users/auth');
            })
        }else{
            console.log('User is already Signed Up');
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/users/profile');
}

module.exports.destroySession = function(req, res){
    req.logout();  // put bu passport.js for us  :)

    return res.redirect('/');
}