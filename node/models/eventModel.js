const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

const Schema = mongoose.Schema;

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

EventSchema.statics.getArrayOfEventsById = function (eventIdStringArray) {
    const eventIdObjectIdArray = _.map(eventIdStringArray, ObjectId);
    return this.find({ _id: { $in: eventIdObjectIdArray } }).exec();
};

module.exports = mongoose.model('EventModel', EventSchema);

