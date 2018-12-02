const AWS = require('aws-sdk');
const _ = require('lodash');

const { aws } = require('../config/keys');

module.exports = {
    loadCredentials() {
        const env = process.env.NODE_ENV;
        const { accessKeyId, secretAccessKey } = aws;
        const hasAWSCredentials = accessKeyId && secretAccessKey;

        if (!hasAWSCredentials) throw new Error('Error: Invalid AWS Credentials Found');
        if (env === 'prod' && !hasAWSCredentials) {
            return null;
        }

        return new AWS.Credentials({ accessKeyId, secretAccessKey });
    }
};
