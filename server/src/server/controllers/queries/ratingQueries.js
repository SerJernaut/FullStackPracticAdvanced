const bd = require('../../models/index');
const ServerError = require('../../errors/ServerError');

module.exports.updateRating = async (data, predicate, transaction) => {
  const [updatedCount, [updatedRating]] = await bd.Ratings.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount === 1) {
    return updatedRating.dataValues;
  }
  throw new ServerError('cannot update mark on this offer');
};

module.exports.createRating = async (data, transaction) => {
  const result = await bd.Ratings.create(data, { transaction });
  if ( result) {
    return result.get({ plain: true });
  }
  throw new ServerError('cannot mark offer');
};

