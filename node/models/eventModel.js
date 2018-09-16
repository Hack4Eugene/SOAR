const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProjectModel = require('./projectModel');

const EventSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the event name'
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    eventDate: {
        type: Date
    },
    project: {
        type: Schema.Types.ObjectId,
        required: 'Kindly enter the project.id'
    },
    organization: {
        type: Schema.Types.ObjectId,
        required: 'objectId of the organization (that owns the event) is needed'
    },
    private: {
        type: Boolean,
        default: false
    },
    tags: {
        type: [String]
    },
    attendees: {
        type: [String]
    }
});

module.exports = mongoose.model('EventModel', EventSchema);

