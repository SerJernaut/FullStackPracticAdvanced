import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import getUserReducer from './userReducer';
import dataForContestReducer from './dataForContestReducer';
import payReducer from './payReducer';
import getContestsReducer from './getContestsReducer';
import storeContestReducer from './storeContestReducer';
import bundleReducer from './bundleReducer';
import getContestByIdReducer from './getContestByIdReducer';
import updateContestReducer from './updateContestReducer';
import chatReducer from './chatReducer';
import userProfileReducer from './userProfileReducer';
import transactionsReducer from './transactionsReducer'
import confirmResetPasswordReducer from "./confirmResetPasswordReducer";
import sendEmailForResetPasswordReducer from "./sendEmailForResetPasswordReducer";
import moderateOffersReducer from "./moderateOffersReducer";

const appReducer=combineReducers({
   form: formReducer,
   userStore: getUserReducer,
   auth: authReducer,
   dataForContest: dataForContestReducer,
   payment: payReducer,
   contestByIdStore: getContestByIdReducer,
   contestsList: getContestsReducer,
   contestStore: storeContestReducer,
   bundleStore: bundleReducer,
   updateContestStore: updateContestReducer,
   chatStore: chatReducer,
   userProfile: userProfileReducer,
   transactionsStore: transactionsReducer,
   preResetPasswordStore: sendEmailForResetPasswordReducer,
   confirmResetPasswordStore: confirmResetPasswordReducer,
   moderateOffersStore: moderateOffersReducer
});

export default appReducer;