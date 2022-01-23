
// const { render } = require('ejs');
const TaskList = require('../models/task_list');

module.exports.home = function(req, res){

    return res.render('home', {
        title: 'Welcome'
    });

    

}

// module.exports.actionName = function(req, res){}