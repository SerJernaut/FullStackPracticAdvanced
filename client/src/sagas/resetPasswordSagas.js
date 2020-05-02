import * as restController from "../api/rest/restController";
import {put} from "redux-saga/effects";
import {
    confirmResetPasswordError,
    confirmResetPasswordSuccess,
    sendMailForResetPasswordError, sendMailForResetPasswordSuccess
} from "../actions/actionCreator";
import {toast} from "react-toastify";
import React from "react";

const toastOptions = {
    autoClose: 6000,
    hideProgressBar: false
}

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
            console.log(data)
            toast.info(data, toastOptions);
        }
    }
    catch (err) {
        yield put(confirmResetPasswordError(err.response));
        console.log(err)
        const {response: {data}} = err;
        toast.error(data, toastOptions);
    }
}
