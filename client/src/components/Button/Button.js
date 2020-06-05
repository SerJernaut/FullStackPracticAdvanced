import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Button.module.sass';

const Button = ({className, isDisabled, ...rest}) => {

    const classNameValue = classNames(styles.button,
        className,
        {[styles.disabled]: isDisabled}
    );

    return (
        <button disabled={isDisabled} className={classNameValue} {...rest}/>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};


export default Button;