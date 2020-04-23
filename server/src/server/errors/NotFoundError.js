const ApplicationError = require('./ApplicationError');

class NotFoundError extends ApplicationError{
    constructor (message) {
        super(message || 'not found', 400);
    }
}

module.exports = NotFoundError;
