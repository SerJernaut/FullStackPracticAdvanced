import React from 'react';
import styles from './ContestButton.module.sass';
import classNames from 'classnames';

const ContestButton = (props) => {
    const {badgeContent, buttonText, selectedButtonId, setSelectedButtonId, index} = props;
    const selectButton = () => {
        setSelectedButtonId(index)
    }
    const buttonWrapperClassName = classNames(styles.buttonWrapper, {[styles.selectedButton]: selectedButtonId === index});

    return (
        <div className={buttonWrapperClassName}>
            <div className={styles.buttonContainer} onClick={selectButton}>
                <span className={styles.badge}>{badgeContent}</span>
                <h5>{buttonText}</h5>
            </div>

        </div>
    );
};

export default ContestButton;