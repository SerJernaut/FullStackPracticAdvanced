import React from 'react';
import Logo from "../../components/Logo";
import CONSTANTS from "../../constants";
import styles from './ResetPasswordPage.module.sass';
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";

const ResetPasswordPage = () => {
    return (
        <div className={styles.pageContainer}>
            <Logo to={'/'} src={ `${ CONSTANTS.STATIC_IMAGES_PATH }logo.png` } alt="logo"/>
            <ResetPasswordForm/>
        </div>
    );
};

export default ResetPasswordPage;