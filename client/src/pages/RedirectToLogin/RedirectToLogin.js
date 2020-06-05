import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {confirmResetPasswordRequest} from "../../actions/actionCreator";
import history from "../../browserHistory";

const RedirectToLogin = props => {

    useEffect(()=> {
        const {resetConfirmNoticeMessage, error} = props;
        if (resetConfirmNoticeMessage || error) {history.replace('/login')}
    })

    useEffect(()=> {
        const { match: { params } } = props;
        props.confirmResetPassword(params)
    }, [])

    return null;

};

const mapStateToProps = state => state.confirmResetPasswordStore;

const mapDispatchToProps = dispatch => ({confirmResetPassword: accessToken => dispatch(confirmResetPasswordRequest(accessToken))});


export default connect(mapStateToProps, mapDispatchToProps)(RedirectToLogin);