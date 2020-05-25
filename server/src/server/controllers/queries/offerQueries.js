const bd = require('../../models/index');
const ServerError = require('../../errors/ServerError');

module.exports.getAllOffers = async (filter) => {
    const offers = await bd.Offers.findAll(filter);
    if (offers.length > 0) return offers;
    else throw "Can not get offers";
};


module.exports.updateOffer = async (data, predicate, transaction) => {
    const [updatedCount, [updatedOffer]] = await bd.Offers.update(data,
        { where: predicate, returning: true, transaction });
    if (updatedCount !== 1) {
        throw new ServerError('cannot update offer!');
    } else {
        return updatedOffer.dataValues;
    }
};

module.exports.updateOfferStatus = async (data, predicate, transaction) => {
    const result = await bd.Offers.update(data,
        { where: predicate, returning: true, transaction });
    if (result[ 0 ] < 1) {
        throw new ServerError('cannot update offer!');
    } else {
        return result[ 1 ];
    }
};

module.exports.createOffer = async (data) => {
    const result = await bd.Offers.create(data);
    if ( !result) {
        throw new ServerError('cannot create new Offer');
    } else {
        return result.get({ plain: true });
    }
};
