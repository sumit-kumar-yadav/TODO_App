// Fetching the TaskList from the mongoose/DB
const TaskList = require('../models/task_list');

module.exports.add_list = function(req, res){
    console.log(req.body);
    TaskList.create({
        description: req.body.description,
        category: req.body.category,
        dueDate: req.body["due-date"]
    }, function(err, newList){
        if(err){
            console.log('Error in creating the new list.', err);
            return;
        }
        console.log(`Lists added successfully: ${newList}`);
        return res.redirect('back');
    })
    
};