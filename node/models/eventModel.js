const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter the event name'
    },
    date: {
        type: Date,
        required: 'Please enter the date'
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
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
        zipCode: {
            type: Number
        },
    },
    projectId: {
        type: String,
        required: 'Please enter the parent project'
    },
    description: {
        type: String
    },
    project: {
        type: Object
    },
    attendeeIds: {
        type: [String]
    },
    tags: {
        type: [String]
    },
    goals: {
        type: [String]
    }
});

EventSchema.statics.getArrayOfEventsById = function (eventIdStringArray) {
    const eventIdObjectIdArray = _.map(eventIdStringArray, ObjectId);
    return this.find({ _id: { $in: eventIdObjectIdArray } }).exec();
};

module.exports = mongoose.model('EventModel', EventSchema);

