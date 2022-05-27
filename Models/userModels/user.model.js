const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {type:String, required:true},
        email: {type:String, required:true, unique:true},
        password: {type:String, required: true},
        profileImage: {type:String},
        role : [{type:mongoose.Schema.Types.ObjectId,ref:'Role'}],
        active:{type:Boolean,default:true},
        createdAt:{type:Date,default:new Date()},
        updatedAt:{type:Date,default:new Date()}
    }
)

module.exports = mongoose.model ('User', userSchema)