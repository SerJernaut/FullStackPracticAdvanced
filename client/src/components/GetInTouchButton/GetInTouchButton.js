import React from 'react';
import styles from './GetInTouchButton.module.sass';
import classNames from 'classnames';

const GetInTouchButton = ({className}) => {
    const getInTouchStyles = classNames(className, styles.getInTouchBtn)
    return (
        <button className={getInTouchStyles}>get in touch</button>
    );
};

export default GetInTouchButton;