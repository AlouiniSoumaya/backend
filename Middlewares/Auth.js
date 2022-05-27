const jwt = require('jsonwebtoken');
const userSchema = require('../Models/userModels/user.model')

exports.isAuth = async (req,res,next) =>{
    
    const token = req.header('Authorization')
    try {
        if(!token){
            return res.status(400).send({msg:'invalid token'})
        }
        const decode = jwt.verify(token,process.env.passwordToken);
        if(!decode){
            return res.status(400).send({msg:'Bad Authorization'});
        }
        const user = await userSchema.findById(decode.id);
        if(!user){
            return res.status(400).send({msg:'Bad Authorization'});
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(500).send({msg:'Bad Authorization'})
    }
}