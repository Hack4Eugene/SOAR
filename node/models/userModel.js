const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type: String,
        required: 'Kindly enter your name'
    },
    username: {
        type: String
    },
    password:{
        type: String
    },
    organization: {
        id:{
            type: Schema.Types.ObjectId,
        },
        name:{
            type: String
        },
        role:{
            type: String,
            enum : ['admin', 'not_admin'],
            default : 'not_admin'
        }
    }
});

module.exports = mongoose.model('UserModel', UserSchema)