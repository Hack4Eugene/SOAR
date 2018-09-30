const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: 'User\'s require names, kindly enter your name.'
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    createdAt: {
        type: Date
    },
    organizations: [
        {
            _id: {
                type: Schema.Types.ObjectId
            },
            name: {
                type: String
            },
            role: {
                type: String,
                enum: ['super_user', 'organization_owner', 'project_owner', 'event_owner', 'user', 'read_only'],
                default: 'read_only'
            }
        }
    ]
});

UserSchema.statics.getAttendeeDetails = function (attendeeIds) {
    return this.find({ _id: { $in: attendeeIds } }, { name: 1 }).exec();
};

module.exports = mongoose.model('UserModel', UserSchema);

