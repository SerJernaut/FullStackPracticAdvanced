const {findTransactionHistory} = require("./queries/userQueries");
const {generateAccessToken} = require("../utils/generateAndCheckUtils");
const jwt = require('jsonwebtoken');
const CONSTANTS = require('../../constants');
const bd = require('../models/index');
const ServerError = require('../errors/ServerError');
const NotUniqueEmail = require('../errors/NotUniqueEmail');
const moment = require('moment');
const uuid = require('uuid/v1');
const controller = require('../../socketInit');
const userQueries = require('./queries/userQueries');
const bankQueries = require('./queries/bankQueries');
const ratingQueries = require('./queries/ratingQueries');

module.exports.findUserByEmail = async (req, res, next) => {
  try{
    const email = req.body.email || req.tokenData.email;
      req.foundUser = await userQueries.findUser({email});
      return next();
  }
  catch (err) {
    next(err);
  }
}

module.exports.findUserById = async (req, res, next) => {
  try{
    const {userId} = req.updatedOffer;
    req.foundUser = await userQueries.findUser({id: userId}, ['firstName', 'lastName', 'email']);
    next();
  }
  catch (err) {
    next(err);
  }
}

module.exports.checkIfPasswordsAreNotEquals = async (req, res, next) => {
  try{
    const newPassword = req.body.newPassword || req.tokenData.newPassword;
    const {foundUser: {password}} = req;
    await userQueries.checkIfPasswordsAreNotEquals(newPassword, password);
    next()
  }
  catch(err) {
    next(err);
  }
}


module.exports.checkIfPasswordsAreEquals = async (req, res, next) => {
  try {
    const {foundUser, body} = req;
    await userQueries.checkIfPasswordsAreEquals(body.password, foundUser.password);
    next();
  }
  catch(err) {
    next(err)
  }
}

module.exports.generateAccessTokenForNewPassword = (req, res, next) => {
  try {
    const {foundUser: {email}, newPassword} = req;
    req.accessToken = generateAccessToken({
      email,
      newPassword
    });
    next();
  } catch (err) {
    next(err)
  }
}

module.exports.generateAccessTokenForAuthentication = (req, res, next) => {
  try {
    const userData = req.foundUser || req.newUser;
    const {firstName, id, role, lastName, avatar, displayName, balance, email, rating} = userData;
    req.accessToken = generateAccessToken({
      firstName,
      userId: id,
      role,
      lastName,
      avatar,
      displayName,
      balance,
      email,
      rating
    });
    next();
  } catch (err) {
    next(err)
  }
}

module.exports.createNewUser = async (req, res, next) => {
  try{
    const {body, hashPass} = req;
    req.newUser = await userQueries.createUser({...body, password: hashPass});
    next()
  }
  catch(err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      next(new NotUniqueEmail());
    } else {
      next(err);
    }
  }
}

module.exports.updateUserAccessToken= async (req, res, next) => {
  try {
    const {accessToken} = req;
    const user = req.foundUser || req.newUser;
    await userQueries.updateUser({ accessToken }, user.id);
    res.send({ token: accessToken });
  } catch (err) {
    next(err);
  }
};

module.exports.registration = async (req, res, next) => {
  try {
    const {body, hashPass} = req;
    const newUser = await userQueries.createUser(
      Object.assign(body, { password: hashPass }));
    const accessToken = jwt.sign({
      firstName: newUser.firstName,
      userId: newUser.id,
      role: newUser.role,
      lastName: newUser.lastName,
      avatar: newUser.avatar,
      displayName: newUser.displayName,
      balance: newUser.balance,
      email: newUser.email,
      rating: newUser.rating,
    }, CONSTANTS.JWT_SECRET, { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME });
    await userQueries.updateUser({ accessToken }, newUser.id);
    res.send({ token: accessToken });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      next(new NotUniqueEmail());
    } else {
      next(err);
    }
  }
};

function getQuery (offerId, userId, mark, isFirst, transaction) {
  const getCreateQuery = () => ratingQueries.createRating({
    offerId,
    mark,
    userId,
  }, transaction);
  const getUpdateQuery = () => ratingQueries.updateRating({ mark },
    { offerId, userId }, transaction);
  return isFirst ? getCreateQuery : getUpdateQuery;
}

module.exports.changeMark = async (req, res, next) => {
  let sum = 0;
  let avg = 0;
  let transaction;
  const { isFirst, offerId, mark, creatorId } = req.body;
  const userId = req.tokenData.userId;
  try {
    transaction = await bd.sequelize.transaction(
      { isolationLevel: bd.Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED });
    const query = getQuery(offerId, userId, mark, isFirst, transaction);
    await query();
    const offersArray = await bd.Ratings.findAll({
      include: [
        {
          model: bd.Offers,
          required: true,
          where: { userId: creatorId },
        },
      ],
      transaction,
    });
    for (let i = 0; i < offersArray.length; i++) {
      sum += offersArray[ i ].dataValues.mark;
    }
    avg = sum / offersArray.length;

    await userQueries.updateUser({ rating: avg }, creatorId, transaction);
    transaction.commit();
    controller.getNotificationController().emitChangeMark(creatorId);
    res.send({ userId: creatorId, rating: avg });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.payment = async (req, res, next) => {
  let transaction;
  try {
    transaction = await bd.sequelize.transaction();
    await bankQueries.updateBankBalance({
        balance: bd.sequelize.literal(`
                CASE
            WHEN "cardNumber"='${ req.body.number.replace(/ /g,
          '') }' AND "cvc"='${ req.body.cvc }' AND "expiry"='${ req.body.expiry }'
                THEN "balance"-${ req.body.price }
            WHEN "cardNumber"='${ CONSTANTS.SQUADHELP_BANK_NUMBER }' AND "cvc"='${ CONSTANTS.SQUADHELP_BANK_CVC }' AND "expiry"='${ CONSTANTS.SQUADHELP_BANK_EXPIRY }'
                THEN "balance"+${ req.body.price } END
        `),
      },
      {
        cardNumber: {
          [ bd.sequelize.Op.in ]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            req.body.number.replace(/ /g, ''),
          ],
        },
      },
      transaction);
    const orderId = uuid();
    req.body.contests.forEach((contest, index) => {
      const prize = index === req.body.contests.length - 1 ? Math.ceil(
        req.body.price / req.body.contests.length)
        : Math.floor(req.body.price / req.body.contests.length);
      contest = Object.assign(contest, {
        status: index === 0 ? 'active' : 'pending',
        userId: req.tokenData.userId,
        priority: index + 1,
        orderId,
        createdAt: moment().format('YYYY-MM-DD HH:mm'),
        prize,
      });
    });
    await bd.Contests.bulkCreate(req.body.contests, transaction);
    transaction.commit();
    res.send();
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {body, file, tokenData: {userId}} = req;
    if (file) {
      body.avatar = file.filename;
    }
    const updatedUser = await userQueries.updateUser(body,
        userId);
    res.send({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      displayName: updatedUser.displayName,
      avatar: updatedUser.avatar,
      email: updatedUser.email,
      balance: updatedUser.balance,
      role: updatedUser.role,
      id: updatedUser.id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.cashout = async (req, res, next) => {
  let transaction;
  try {
    transaction = await bd.sequelize.transaction();
    const updatedUser = await userQueries.updateUser(
      { balance: bd.sequelize.literal('balance - ' + req.body.sum) },
      req.tokenData.userId, transaction);
    await bankQueries.updateBankBalance({
        balance: bd.sequelize.literal(`CASE 
                WHEN "cardNumber"='${ req.body.number.replace(/ /g,
          '') }' AND "expiry"='${ req.body.expiry }' AND "cvc"='${ req.body.cvc }'
                    THEN "balance"+${ req.body.sum }
                WHEN "cardNumber"='${ CONSTANTS.SQUADHELP_BANK_NUMBER }' AND "expiry"='${ CONSTANTS.SQUADHELP_BANK_EXPIRY }' AND "cvc"='${ CONSTANTS.SQUADHELP_BANK_CVC }'
                    THEN "balance"-${ req.body.sum }
                 END
                `),
      },
      {
        cardNumber: {
          [ bd.sequelize.Op.in ]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            req.body.number.replace(/ /g, ''),
          ],
        },
      },
      transaction);
    transaction.commit();
    await userQueries.createTransactionByFilter({typeOperation: "CONSUMPTION",
    sum: req.body.sum,
    userId: updatedUser.id})
    res.send({ balance: updatedUser.balance });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.getUserTransactionsHistory = async (req, res, next) => {
  try{
    const {userId} = req.tokenData;
    const result = await findTransactionHistory(userId);
    return res.send(result);
  }
  catch(e){
    next(e);
  }
}

module.exports.getUserTransactionBankStatements = async (req, res, next) => {
  try {
    const {userId} = req.tokenData;
    const filter = {
      where: {
        userId,
      },
      raw: true,
      attributes: ['typeOperation', [bd.Sequelize.fn('sum', bd.Sequelize.col('sum')), 'sum']],
      group: ['typeOperation'],
    };
    const getTransactionStatements = await userQueries.findTransactionStatementsByFilter(filter);
    console.log(getTransactionStatements)
    if (getTransactionStatements) {
      const prepareResult = {...getTransactionStatements};
      console.log(prepareResult)
      const prepareResultSize = Object.keys(prepareResult).length;
      for (let i = 0; i < prepareResultSize; i++) {
        (prepareResult[i].typeOperation === 'INCOME') ?
            prepareResult[i].INCOME = prepareResult[i].sum :
            prepareResult[i].CONSUMPTION = prepareResult[i].sum
        delete prepareResult[i].sum;
        delete prepareResult[i].typeOperation;
      }
      const result = {...prepareResult[0], ...prepareResult[1]};
      return res.send(result);
    }


  } catch (e) {
    next(e);
  }
};

module.exports.updateUserByAccessToken = async (req, res, next) => {
  try{
    const {tokenData: {email, newPassword}} = req;
    const updatedUser = await userQueries.updateUserByEmail({password: newPassword}, email);
    if (updatedUser) {
      req.updatedUser = updatedUser;
      return next();
    }
    return new ServerError("can't find the user")
  }
  catch(e) {
    next(e);
  }
}