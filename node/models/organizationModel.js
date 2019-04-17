const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter the organization name'
    },
    address: {
        street: {
			type: String
		},
        city: {
			type: String
		},
		state: {
			type: String
        },
        zipcode: {
            type: Number
        },
    },
    contactInformation: {
        phoneNumber: {
            type: String
        },
        email: {
            type: String
        }
    },
    website: {
        type: String
    },
    tagline: {
        type: String
    },
    description: {
        type: String
    },
    created_at: {
        type: Date
    },
    deleted_at: {
        type: Date,
        default: null
    },
    projectIds: {
        type: [String],
        default: []
    },
    projects: {
        type: [Object],
        default: []
    },
    tags: {
        type: [String],
        default: []
    },
    memberIds: {
        type: [String]
    },
    // members: {
    //     type: [Object]
    // },
});

OrganizationSchema.statics.getById = function (organizationId) {
    return this.findOne({ _id: organizationId })
        .then(res => res)
        .catch(err => err)
};

module.exports = mongoose.model('OrganizationModel', OrganizationSchema);
