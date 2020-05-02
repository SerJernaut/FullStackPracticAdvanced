const jwt = require('jsonwebtoken');
const CONSTANTS = require('../../constants');
const TokenError = require('../errors/TokenError')

module.exports = async (req, res, next) => {
    const {accessToken} = req.body;
    if (!accessToken) {
        return next(new TokenError('need token'));
    }
    try {
        req.tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
        console.log(req.tokenData)
        return next();
    } catch (err) {
        next(new TokenError());
    }
};
