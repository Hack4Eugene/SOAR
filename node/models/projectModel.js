const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _ = require('lodash');

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the project name'
    },
    tagline: {
        type: String
    },
    description: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    organization: {
        type: Schema.Types.ObjectId,
        required: 'objectId of the organization is needed'
    },
    status: {
        type: String,
        enum: ['not_started', 'in_progress', 'completed'],
        default: 'not_started'
    },
    private: {
        type: Boolean,
        default: false
    },
    tags: {
        type: [String]
    },
    events: {
        type: [Schema.Types.ObjectId]
    }
});

module.exports = mongoose.model('ProjectModel', ProjectSchema);
