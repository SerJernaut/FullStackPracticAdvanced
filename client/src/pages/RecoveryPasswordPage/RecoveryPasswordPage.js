import React from 'react';
import Logo from "../../components/Logo";
import CONSTANTS from "../../constants";
import styles from './RecoveryPasswordPage.module.sass';
import RecoveryPasswordForm from "../../components/RecoveryPasswordForm/RecoveryPasswordForm";

const RecoveryPasswordPage = () => {
    return (
        <div className={styles.pageContainer}>
            <Logo className={styles.logo} to={'/'} src={ `${ CONSTANTS.STATIC_IMAGES_PATH }logo.png` } alt="logo"/>
            <RecoveryPasswordForm/>
        </div>
    );
};

export default RecoveryPasswordPage;