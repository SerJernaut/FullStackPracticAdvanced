import React from 'react';
import styles from './ContestButton.module.sass';
import classNames from 'classnames';

const ContestButton = ({badgeContent, buttonText, selectedButtonId, setSelectedButtonId, index}) => {
    const selectButton = () => {
        setSelectedButtonId(index)
    }
    const buttonContainerClassName = classNames(styles.buttonContainer, {[styles.selectedButton]: selectedButtonId === index});

    return (
        <div className={buttonContainerClassName}>
            <button onClick={selectButton}>
                <span className={styles.badge}>{badgeContent}</span>
                <p>{buttonText}</p>
            </button>
        </div>
    );
};

export default ContestButton;