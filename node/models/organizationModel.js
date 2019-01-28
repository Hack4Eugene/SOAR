const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the organization name'
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
            type: String
        },
		country: {
			type: String
		}
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
    tags: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('OrganizationModel', OrganizationSchema);
