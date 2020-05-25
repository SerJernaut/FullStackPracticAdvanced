const express = require('express');
const checkToken = require('../middlewares/checkToken');
const contestController = require('../controllers/contestController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
const userController = require('../controllers/userController');
const validators = require('../middlewares/validators');

const contestsRouter = express.Router();

contestsRouter.post(
    '/pay',
    checkToken.checkToken,
    basicMiddlewares.onlyForCustomer,
    upload.uploadContestFiles,
    basicMiddlewares.parseBody,
    validators.validateContestCreation,
    userController.payment,
);

contestsRouter.post(
    '/dataForContest',
    checkToken.checkToken,
    contestController.dataForContest,
);

contestsRouter.post(
    '/getCustomersContests',
    checkToken.checkToken,
    contestController.getCustomersContests,
);

contestsRouter.get(
    '/getContestById',
    checkToken.checkToken,
    contestController.getContestById,
);

contestsRouter.post(
    '/getAllContests',
    checkToken.checkToken,
    basicMiddlewares.onlyForCreative,
    contestController.getContests,
);

contestsRouter.post(
    '/updateContest',
    checkToken.checkToken,
    upload.updateContestFile,
    contestController.updateContest,
);

contestsRouter.get(
    '/downloadFile/:fileName',
    checkToken.checkToken,
    contestController.downloadFile,
);

module.exports = contestsRouter;