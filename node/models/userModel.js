const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.set('runValidators', true);

const UserSchema = new Schema({
    email: {
        type: String,
        required: 'Please enter an email address.'
    },
    password: {
        type: String,
        required: 'Please enter a password.'
    },
    name: {
        type: String
    },
    zipCode: {
        type: Number
    },
    website: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    description: {
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
            }
        }
    ],
    roles: [
        {
            role_id: {
                type: Schema.Types.ObjectId
            },
            entity: {
                type: String,
                enum: ['project', 'organization', 'event', 'site'],
                required: 'Please specify an entity. One of: project, organization, or event'
            },
            entity_id: {
                type: String,
                required: 'Please submit the ID of the entity for access'
            }
        }
    ],
});

UserSchema.statics.getAttendees = function (attendeeIds) {
    return this.find({ _id: { $in: attendeeIds } }, { name: 1 }).exec();
};

UserSchema.statics.getOrgMembers = function (memberIds) {
    return this.find({ _id: { $in: memberIds } }, { name: 1 }).exec();
};

UserSchema.statics.addRole = function (userID, entity, entityID) {
    const newRole = {
        entity,
        entity_id: entityID
    };

    return this.findOneAndUpdate({ _id: userID }, { $push: { roles: newRole } }, { new: true });
};

module.exports = mongoose.model('UserModel', UserSchema);

