import React from 'react';
import styles from './GetInTouchButton.module.sass';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const GetInTouchButton = ({className}) => {
    const getInTouchStyles = classNames(className, styles.getInTouchBtn)
    return (
        <button className={getInTouchStyles}>get in touch</button>
    );
};

GetInTouchButton.propTypes = {
    className: PropTypes.string
}

export default GetInTouchButton;