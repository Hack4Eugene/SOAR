const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const Promise = require('bluebird');
const UserModel = mongoose.model('UserModel');
const RequestError = require('../lib/Errors');

//Hash and Salt Password
module.exports = {
    getHash: (password, salt) => Promise.resolve(bcrypt.hash(password, salt)),
    comparePasswordHash: (password, hash) => bcrypt.compare(password, hash).then(res => res).catch(err => err)
};