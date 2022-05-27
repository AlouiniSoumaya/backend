const userSchema = require ('../Models/userModels/user.model');
const bcrypt = require ('bcrypt');
const roleSchema = require ('../Models/userModels/user.role');

const init = async () => {
    try {
        await roleSchema.insertMany([{name:'user'},{name:'admin'}]);
        const isAdmin = await roleSchema.findOne({name:'admin'});
        const adminExists = await userSchema.findOne({role:[isAdmin._id]});
        if (!adminExists){
            const newAdmin = new userSchema ({
                name: 'admin',
                email: 'admin@admin.com',
                password: bcrypt.hashSync('qwerty',10),
                role : [isAdmin._id]
            })
            await newAdmin.save();
            console.log('Admin is created successfully..');
        }
    } catch (error) {
       console.log(error); 
    }
}

module.exports = init;