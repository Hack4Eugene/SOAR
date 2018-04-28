const passport = require('passport');
const ObjectId = require('mongodb').ObjectId;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../../models/userModel');

//Todo: config load the JWT secrets and add to gitignore
const jwtOpts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'AUTHENTICATED_S.O.A.R_USER'
};

const strategy = new JWTStrategy(jwtOpts, function (jwtPayload, cb) {
    //find the userID
    return UserModel.findOne(ObjectId(jwtPayload))
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
});

passport.use(strategy);

module.exports = { jwtOpts };