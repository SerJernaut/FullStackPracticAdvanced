import {put, select} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';
import CONSTANTS from "../constants";
import {
    getModerationOffersError,
    getModerationOffersSuccess,
    offerModerationRejectingError,
    offerModerationRejectingSuccess,
    offerModerationResolvingError,
    offerModerationResolvingSuccess
} from "../actions/actionCreator";
import {toast} from "react-toastify";
import {toastOptions} from "../utils/toastOptions";

export function* changeMarkSaga(action) {
    try {
        const {data} = yield  restController.changeMark(action.data);
        const offers = yield select(state => state.contestByIdStore.offers);
        offers.forEach(offer => {
            if (offer.User.id === data.userId) {
                offer.User.rating = data.rating;
            }
            if (offer.id === action.data.offerId) {
                offer.mark = action.data.mark;
            }
        });
        yield  put({type: ACTION.CHANGE_MARK_SUCCESS, data: offers});
    } catch (err) {
        yield  put({type: ACTION.CHANGE_MARK_ERROR, error: err.response});
    }
}


export function* addOfferSaga(action) {
    try {
        const {data} = yield restController.setNewOffer(action.data);
        const offers = yield select(state => state.contestByIdStore.offers);
        offers.unshift(data);
        yield put({type: ACTION.ADD_NEW_OFFER_TO_STORE, data: offers});
    } catch (e) {
        yield put({type: ACTION.ADD_OFFER_ERROR, error: e.response});
    }
}


export function* setOfferStatusSaga(action) {
    try {
        const {data} = yield  restController.setOfferStatus(action.data);
        const offers = yield  select(state => state.contestByIdStore.offers);
        offers.forEach(offer => {
            if (data.status === CONSTANTS.OFFER_STATUS_WON) {
                offer.status = data.id === offer.id ? CONSTANTS.OFFER_STATUS_WON : CONSTANTS.OFFER_STATUS_REJECTED;
            } else if (data.id === offer.id) {
                offer.status = CONSTANTS.OFFER_STATUS_REJECTED;
            }
        });
        yield  put({type: ACTION.CHANGE_STORE_FOR_STATUS, data: offers});
    } catch (e) {
        yield  put({type: ACTION.SET_OFFER_STATUS_ERROR, error: e.response});
    }
}

export function* getModerationOffersSaga (action) {
    try {
        const {data: {offers, hasMore}} = yield restController.getModerationOffers(action.paginationFilter);
        if (Array.isArray(offers) && typeof hasMore === "boolean") {
            yield put (getModerationOffersSuccess(offers, hasMore))
        }
    }
    catch (e) {
        yield put(getModerationOffersError(e.response))
    }
}

export function* moderationResolvingSaga (action) {
    try{
        const {data: {offerId, messageForModerator}} = yield restController.moderationResolvingOffer(action.offerId)
        if (typeof offerId === "number" && typeof messageForModerator === "string") {
            yield put (offerModerationResolvingSuccess(offerId, messageForModerator))
            toast.success(messageForModerator, toastOptions);
        }
    }
    catch(e) {
        yield put(offerModerationResolvingError(e.response));
        const {response: {data}} = e;
        toast.error(data, toastOptions);
    }
}

export function* moderationRejectingSaga (action) {
    try{
        const {data: {offerId, messageForModerator}} = yield restController.moderationRejectingOffer(action.offerId)
        if (typeof offerId === "number" && typeof messageForModerator === "string") {
            yield put (offerModerationRejectingSuccess(offerId, messageForModerator));
            toast.success(messageForModerator, toastOptions);
        }
    }
    catch(e) {
        yield put(offerModerationRejectingError(e.response));
        const {response: {data}} = e;
        toast.error(data, toastOptions);
    }
}
