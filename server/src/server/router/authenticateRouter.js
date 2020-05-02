const express = require('express');
const hashPass = require('../middlewares/hashPassMiddle');
const validators = require('../middlewares/validators');
const userController = require('../controllers/userController');

const authenticateRouter = express.Router();

authenticateRouter.post(
    '/registration',
    validators.validateRegistrationData,
    hashPass,
    userController.registration,
);

authenticateRouter.post(
    '/login',
    validators.validateLogin,
    userController.login,
);


export default authenticateRouter;