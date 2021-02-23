// install and require moment for changing date format in js
const moment = require('moment'); // require

// Fetching the TaskList from the mongoose/DB
const TaskList = require('../models/task_list');

module.exports.add_list = function(req, res){
    console.log(req.body);
    

    // Change date format using moment.js liberary
    var newDate = req.body["due-date"];
    newDate = moment(newDate, 'DD/MM/YYYY').format('dddd MMMM D Y');
    console.log(newDate);

    TaskList.create({
        description: req.body.description,
        category: req.body.category,
        dueDate: newDate        //req.body["due-date"] // -->>original format which was fetched
    }, function(err, newList){
        if(err){
            console.log('Error in creating the new list.', err);
            return;
        }
        console.log(`Lists added successfully: ${newList}`);
        return res.redirect('back');
    });


            // To fetch today's date using js   -->>  for knowledge
    // function mydate(date)
    // {
    //     var
    //         month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    //         days  = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //     return days[date.getDay()]+' '+month[date.getMonth()]+' '+date.getDate()+' '+date.getFullYear()
    // }
    // console.log(mydate(new Date()));


            // To convert the date format using js  -->> But it takes input format 'mm/dd/yyyy' by default  :(
    // var newDate = req.body["due-date"];
    // var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    // var now = new Date(newDate);  // create date object in js   --> inbuilt
    // console.log(days[now.getDay()] + ' ' + months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear()); //Tuesday February 12 2013
    // newDate = days[now.getDay()] + ' ' + months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();
    
};