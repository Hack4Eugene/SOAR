const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Q = require('q');
const _ = require('lodash');

const UserSchema = new Schema({
    name : {
        type: String,
        required: 'User\'s require names, kindly enter your name.'
    },
    username: {
        type: String
    },
    password:{
        type: String
    },
    createdAt: {
        type: Date
    },
    organizations: [
        {
            id:{
                type: Schema.Types.ObjectId,
            },
            name:{
                type: String
            },
            role:{
                type: String,
                enum : ['super_user', 'organization_owner', 'project_owner', 'event_owner', 'user', 'read_only'],
                default : 'read_only'
            }
        }
    ]
});

UserSchema.methods.cleanById = function (userId) {
    return Q.ninvoke(UserSchema, 'findById', `{ _id: ${userId} }`)
    .then(userRecord => {
        delete userRecord.password
        return userRecord
    })
}

UserSchema.methods.cleanByIdArray = function cleanByIdArray(userIdArray) {
    console.log('MODEL params userIdArray', userIdArray)

    return Q.ninvoke(UserSchema, 'findById', `{ _id: { $in: ${userIdArray} } }`)
    .then(userRecords => _.map(userRecords, userRecord => {
        console.log('MODEL userRecord', userRecord)
        delete userRecord.password
        return userRecord
    }))
    .catch(err => {
        console.log('cleanByIdArray error', err);
        return err;
    })
}

module.exports = mongoose.model('UserModel', UserSchema);

