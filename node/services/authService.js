const bcrypt = require('bcrypt');

//Hash and Salt Password
module.exports = {
    getHash: (password, salt) => bcrypt.hash(password, salt),
    comparePasswordHash: (password, hash) => bcrypt.compare(password, hash)
};
