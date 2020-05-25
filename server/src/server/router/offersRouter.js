const express = require('express');
const checkToken = require('../middlewares/checkToken');
const offerController = require('../controllers/offerController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
const validators = require('../middlewares/validators');
const userController = require('../controllers/userController');

const offersRouter = express.Router();

offersRouter.post(
    '/changeMark',
    checkToken.checkToken,
    basicMiddlewares.onlyForCustomer,
    userController.changeMark,
);

offersRouter.post(
    '/setNewOffer',
    checkToken.checkToken,
    upload.uploadLogoFiles,
    basicMiddlewares.canSendOffer,
    offerController.setNewOffer,
);

offersRouter.post(
    '/setOfferStatus',
    checkToken.checkToken,
    basicMiddlewares.onlyForCustomerWhoCreateContest,
    offerController.setOfferStatus,
);

offersRouter.get(
    '/getOffersFiles',
    validators.validateOffersFiles,
    offerController.getOffersByFilter
)

module.exports = offersRouter;