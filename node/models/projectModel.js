const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const Schema = mongoose.Schema;

const OrganizationModel = require('./organizationModel');

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
    createDate: {
        type: Date
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
    alliance: {
        type: [Schema.Types.ObjectId],
        default: []
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
    tags: [String],
    events: [Schema.Types.ObjectId],
    images: [Schema.Types.Mixed]
});

ProjectSchema.statics.addEventId = function (projectId, eventId) {
    return this.findOneAndUpdate({ _id: ObjectId(projectId) }, { $push: { events: ObjectId(eventId) } }, { new: true }).exec();
};

ProjectSchema.statics.getById = function (projectId) {
    return this.findOne({ _id: projectId }).lean()
        .then(project => {
            return OrganizationModel.find({ _id: { $in: project.alliance } })
                .then(organizations => {
                    project.alliance_data = organizations;
                    return project;
                });
        });
};

module.exports = mongoose.model('ProjectModel', ProjectSchema);
