const jwt = require('jsonwebtoken');
const CONSTANTS = require('../../constants');
const TokenError = require('../errors/TokenError')

module.exports = async (req, res, next) => {
    try {
        const {accessToken} = req.body;
        req.tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
        next();

    } catch (err) {
        next(err);
    }
};
