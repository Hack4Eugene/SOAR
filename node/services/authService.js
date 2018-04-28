const bcrypt = require('bcrypt');
const Promise = require('bluebird');

//Hash and Salt Password
module.exports = {
    getHash: (password, salt) => bcrypt.hash(password, salt),
    comparePasswordHash: (password, hash) => bcrypt.compare(password, hash).then(res => res).catch(err => err)
};