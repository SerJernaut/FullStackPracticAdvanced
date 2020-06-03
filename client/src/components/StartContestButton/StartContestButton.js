import React from 'react';
import styles from './StartContestButton.module.sass'
import classNames from "classnames";

const StartContestButton = ({className}) => {
    const getInTouchStyles = classNames(className, styles.startContestBtn)
    return (
        <button className={getInTouchStyles}>start a contest</button>
    );
};

export default StartContestButton;