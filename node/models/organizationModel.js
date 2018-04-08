const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    name : {
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
			type: String,
			required: 'Kindly enter your country'
		}
    },
    contactInformation :{
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
    description: {
        type: String
    }
});

module.exports = mongoose.model('OrganizationModel', OrganizationSchema)