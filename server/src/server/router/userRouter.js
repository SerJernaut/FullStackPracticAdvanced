const express = require('express');
const userController = require('../controllers/userController');
const checkToken = require('../middlewares/checkToken');
const upload = require('../utils/fileUpload');
const basicMiddlewares = require('../middlewares/basicMiddlewares');

const userRouter = express.Router();

userRouter.post(
    '/getUser',
    checkToken.checkAuth,
);

userRouter.post(
    '/updateUser',
    checkToken.checkToken,
    upload.uploadAvatar,
    userController.updateUser,
);

userRouter.post(
    '/cashout',
    checkToken.checkToken,
    basicMiddlewares.onlyForCreative,
    userController.cashout,
);


userRouter.get(
    '/getUserTransactionHistory',
    checkToken.checkToken,
    userController.getUserTransactionsHistory
)

userRouter.get(
    '/getUserTransactionBankStatements',
    checkToken.checkToken,
    userController.getUserTransactionBankStatements
)

module.exports = userRouter;
