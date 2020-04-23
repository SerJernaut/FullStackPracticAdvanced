import {put,select} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';



export function* getUserTransactionsSaga(){
    try{
        const {data}= yield  restController.getUserTransactionsHistory();
        console.log(data);
        yield  put({type: ACTION.GET_USER_TRANSACTIONS_HISTORY_SUCCESS, data});
    }
    catch (e) {
        yield put({type: ACTION.GET_USER_TRANSACTIONS_HISTORY_ERROR, error: e.response});
    }
    }

export function* getUserTransactionStatementsSaga(){
    try{
        const {data}= yield  restController.getUserTransactionStatements();
        console.log(data);
        yield  put({type: ACTION.GET_USER_TRANSACTION_STATEMENTS_SUCCESS, data});
    }
    catch (e) {
        yield put({type: ACTION.GET_USER_TRANSACTION_STATEMENTS_ERROR, error: e.response});
    }
}
