const express = require('express');
const hashPass = require('../middlewares/hashPassMiddle');
const validators = require('../middlewares/validators');
const userController = require('../controllers/userController');

const authenticateRouter = express.Router();

authenticateRouter.post(
    '/registration',
    validators.validateRegistrationData,
    hashPass,
    userController.createNewUser,
    userController.generateAccessTokenForAuthentication,
    userController.updateUserAccessToken
);

authenticateRouter.post(
    '/login',
    validators.validateLogin,
    userController.findUserByEmail,
    userController.checkIfPasswordsAreEquals,
    userController.generateAccessTokenForAuthentication,
    userController.updateUserAccessToken
);


module.exports = authenticateRouter;