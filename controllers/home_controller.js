
// const { render } = require('ejs');
const TaskList = require('../models/task_list');

module.exports.home = function(req, res){

    TaskList.find({}, function(err, tasksList){
        if(err){
            console.log('Error in fetching the lists');
            return;
        }

        return res.render('home', {
            task_list: tasksList
        })
    })

    

}

// module.exports.actionName = function(req, res){}