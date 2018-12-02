const AWS = require('aws-sdk');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const awsUtil = require('../lib/aws_management');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    parentResource: {
        type: Map
    },
    location: {
        type: String,
    },
    s3Location: {
        type: String
    },
    uploaded_at: {
        type: Date,
        default: Date.now()
    }
});

ImageSchema.statics.upload = async function (entity, entityId, file) {
    const credentials = await awsUtil.loadCredentials();

    const S3 = new AWS.S3({ credentials });

    const bucket = 'ecan-images-nerds-development';
    const storagePrefix = `${entity}/${entityId}/`;
    const storageName = `${file.fieldname}${file.originalname.match(/\..*$/)}`;
    const s3Location = `https://s3-us-west-2.amazonaws.com/${bucket}/${storagePrefix + storageName}`;

    await S3.putObject({
        Bucket: bucket,
        Key: storagePrefix + storageName,
        Body: file.buffer,
        Metadata: {
            extension: file.originalname.match(/\..*$/)[0].replace('.', '')
        }
    }).promise();

    return await this.findOneAndUpdate(
        { location: file.fieldname, parentResource: { entity, entityId: ObjectId(entityId) } },
        { s3Location },
        { upsert: true, new: true, rawResult: false }
    ).exec();
};

module.exports = mongoose.model('ImageSchema', ImageSchema);
