const userSchema = require ('../../Models/userModels/user.model');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');


exports.signUp = async (req,res) => {
    const {email,password,confirmPasswordHashed} = req.body
    try {
        const userExists = await userSchema.findOne ({email:email});
        if (userExists){
            return res.status(400).send({msg: 'User already exists'});
        }
        const newUser = new userSchema(req.body)
        // if(password !== confirmPasswordHashed ){
        //     return res.status(400).send({msg:'confirm password not matched...'})
        // }
        const passwordHashed = bcrypt.hashSync(password, 10);
        
        newUser.password = passwordHashed;
        const userId = {id:newUser._id};
        const token = jwt.sign(userId,process.env.passwordToken);
        await newUser.save ();
        return res.status(200).send({msg: 'User added succussfully..',token});
    } catch (error) {
        return res.status(500).send({msg: error.message});
    }
}

exports.signIn = async (req,res) => {
    const {email,password} = req.body
    try {
        const userExists = await userSchema.findOne({email:email});
        if (!userExists){
            return res.status(400).send({msg: 'User not exists...'});
        }
        
        const passwordHashed = bcrypt.compareSync(password, userExists.password);
        
        if (!passwordHashed){
            return res.status(400).send({msg:'Bad credentials'})
        }
        const userId = {id:userExists._id};
        const token = jwt.sign(userId,process.env.passwordToken);
        return res.status(200).send({msg: 'Logged in successfully..',token});
    } catch (error) {
        return res.status(500).send({msg: error.message});
    }
}

exports.updateUser = async (req,res) =>{
    const {id} = req.body 
    try {
        const userUpdated = await userSchema.findByIdAndUpdate(id,{$set:{...req.body}});
        if(!userUpdated){
            return res.status(400).send({msg:'user not updated'})
        }
        return res.status(200).send({msg:'user updated',user:userUpdated})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.getUsers = async(req,res)=>{
    try {
        const users = await userSchema.find();
        if (users.lenght == 0){
            return res.status(404).send({msg: 'Data base is empty..'});
        }
        return res.status(200).send({users})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.getOneUser = async(req,res)=>{
    const {id} = req.params
    try {
        const user = await userSchema.findById(id);
        if (user.lenght == 0){
            return res.status(404).send({msg: 'user not exists'});
        }
        return res.status(200).send({user})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.deleteUser = async(req,res)=>{
    const {id} = req.params
    try {
        const user = await userSchema.findById(id);
        if (!user){
            return res.status(404).send({msg: 'user not exists'});
        }
        const deleteUser = await userSchema.findByIdAndDelete(id);
        return res.status(200).send({msg:'user deleted successfully',deleteUser})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.banUser = async (req,res) =>{
    const {id} = req.params
    try {
        const user = await userSchema.findByIdAndUpdate(id, { $set: { active:false,updatedAt:new Date() }});
        if(!user){
            return res.status(400).send({msg:'User not exists'})
        }
        return res.status(200).send({message: 'User banned successfully'})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}