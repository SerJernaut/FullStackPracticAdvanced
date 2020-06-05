import * as restController from "../api/rest/restController";
import {put} from "redux-saga/effects";
import {
    confirmResetPasswordError,
    confirmResetPasswordSuccess,
    sendMailForResetPasswordError, sendMailForResetPasswordSuccess
} from "../actions/actionCreator";
import {toast} from "react-toastify";
import React from "react";
import {toastOptions} from "../utils/toastOptions";

export  function* sendEmailForResetPasswordSaga(action){
    try{
        const {data} = yield restController.resetPassword(action.data);
        if (typeof data === 'string') {
            yield put(sendMailForResetPasswordSuccess(data));
            toast.info(data, toastOptions);
        }
    }
    catch (err) {
        yield put(sendMailForResetPasswordError(err.response));
        const {response: {data}} = err;
        toast.error(data, toastOptions);
    }
}

export  function* confirmResetPasswordSaga(action){
    try{
        const {data} = yield restController.confirmResetPassword(action.accessToken);
        if (typeof data === 'string') {
            yield put(confirmResetPasswordSuccess(data));
            toast.info(data, toastOptions);
        }
    }
    catch (err) {
        yield put(confirmResetPasswordError(err.response));
        const {response: {data}} = err;
        toast.error(data, toastOptions);
    }
}
