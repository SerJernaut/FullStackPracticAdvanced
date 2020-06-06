import React from 'react';
import styles from './StartContestButton.module.sass'
import classNames from "classnames";
import PropTypes from "prop-types";

const StartContestButton = ({className}) => {
    const getInTouchStyles = classNames(className, styles.startContestBtn)
    return (
        <button className={getInTouchStyles}>start a contest</button>
    );
};

StartContestButton.propTypes = {
    className: PropTypes.string
}

export default StartContestButton;