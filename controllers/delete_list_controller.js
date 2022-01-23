// Fetching the TaskList from the mongoose/DB
const TaskList = require('../models/task_list');

module.exports.delete_list = async function(req, res){
    try{
        // console.log(req.body);
        let idCollection = req.body.delete;
    
        // console.log(typeof(idCollection));
    
        // If req.body is empty, i.e task is not seleted, then idCollection will be undefined.
        if(idCollection == undefined){
            return res.redirect('back');
        }
    
        // if only one is selected to delete
        if(typeof(idCollection) === "string"){
            await deleteThisTask(idCollection);
            return res.redirect('back');
        }
        else{
            // else if it is object (in case of multiple delete)
            for(let id of idCollection){
                await deleteThisTask(id);
            }
            return res.redirect('back');
        }
    
        async function deleteThisTask(id){
            let task = await TaskList.findById(id);
            // console.log("task is : ", task);
            if(task.user == req.user.id){
                task.remove();
                // console.log("task deleted");
            }
        }
    }catch(err){
        console.log('error in deleting the task', err);
    }
    
};