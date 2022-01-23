const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    }


})


const TaskList = mongoose.model('TaskList', listSchema);

module.exports = TaskList;