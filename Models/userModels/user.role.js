const mongoose = require ('mongoose');

const userRoleSchema = new mongoose.Schema(
    {
        name: {type:String}
    }
)

module.exports = mongoose.model ('Role', userRoleSchema)