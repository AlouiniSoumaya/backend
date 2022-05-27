const mongoose = require ('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {type:String, required:true},
        description: {type:String},
        date: {type:Date},
        image: {type:String},
        assignTo: [{type:mongoose.Schema.Types.ObjectId,ref:'userAssigned'}],
        taskDone: {default:false}
     }
)

module.exports = mongoose.model ('Task', taskSchema)