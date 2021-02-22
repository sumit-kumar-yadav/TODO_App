// Fetching the TaskList from the mongoose/DB
const TaskList = require('../models/task_list');

module.exports.delete_list = function(req, res){
    console.log(req.body);
    let idCollection = req.body.delete;

    console.log(typeof(idCollection));

    // If req.body is empty, i.e task is not seleted, then idCollection will be undefined.
    if(idCollection == undefined){
        return res.redirect('back');
    }

    // if only one is selected to delete
    if(typeof(idCollection) === "string"){
        TaskList.findByIdAndDelete(idCollection, function(err){
            if(err){
                console.log('error in deleting the task');
                return;
            }
        });
        return res.redirect('back');
    }

    // else if it is object (in case of multiple delete)
    for(let id of idCollection){
        TaskList.findByIdAndDelete(id, function(err){
            if(err){
                console.log('error in deleting the task');
                return;
            }
        });
    }

    return res.redirect('back');

    // // If req.body is empty, then we need to redirect the old page, else delete the idCollection array
    // const empty = req.body;
    // if(req.body.keys(empty).length !== 0 && empty.constructor !== req.body){
        
    // }
    
};