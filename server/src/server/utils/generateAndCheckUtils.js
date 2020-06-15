const jwt = require('jsonwebtoken');
const CONSTANTS = require('../../constants');
const ApplicationError = require('../errors/ApplicationError');

module.exports.generateAccessToken = objValues => {
    try {
        return jwt.sign(objValues, CONSTANTS.JWT_SECRET, {expiresIn: CONSTANTS.ACCESS_TOKEN_TIME});
    }
    catch (e) {
        throw new ApplicationError('can not sign access token');
    }
}

