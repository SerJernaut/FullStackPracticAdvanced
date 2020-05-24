const express = require('express');
const checkToken = require('../middlewares/checkToken');
const contestController = require('../controllers/contestController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
const userController = require('../controllers/userController');
const validators = require('../middlewares/validators');

const contestRouter = express.Router();

contestRouter.post(
    '/pay',
    checkToken.checkToken,
    basicMiddlewares.onlyForCustomer,
    upload.uploadContestFiles,
    basicMiddlewares.parseBody,
    validators.validateContestCreation,
    userController.payment,
);

contestRouter.post(
    '/dataForContest',
    checkToken.checkToken,
    contestController.dataForContest,
);

contestRouter.post(
    '/getCustomersContests',
    checkToken.checkToken,
    contestController.getCustomersContests,
);

contestRouter.get(
    '/getContestById',
    checkToken.checkToken,
    contestController.getContestById,
);

contestRouter.post(
    '/getAllContests',
    checkToken.checkToken,
    basicMiddlewares.onlyForCreative,
    contestController.getContests,
);

contestRouter.post(
    '/updateContest',
    checkToken.checkToken,
    upload.updateContestFile,
    contestController.updateContest,
);

contestRouter.get(
    '/downloadFile/:fileName',
    checkToken.checkToken,
    contestController.downloadFile,
);

contestRouter.post(
    '/changeMark',
    checkToken.checkToken,
    basicMiddlewares.onlyForCustomer,
    userController.changeMark,
);

contestRouter.post(
    '/setNewOffer',
    checkToken.checkToken,
    upload.uploadLogoFiles,
    basicMiddlewares.canSendOffer,
    contestController.setNewOffer,
);

contestRouter.post(
    '/setOfferStatus',
    checkToken.checkToken,
    basicMiddlewares.onlyForCustomerWhoCreateContest,
    contestController.setOfferStatus,
);


contestRouter.get(
    '/getOffersFiles',
    validators.validateOffersFiles,
    contestController.getOffersByFilter
)


module.exports = contestRouter;