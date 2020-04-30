import React      from 'react';
import PropTypes  from 'prop-types';
import classNames from 'classnames';
import styles     from './Button.module.sass';

const Button = ({ className, ...rest }) => {

    const classNameValue = classNames( styles.button,
        className
    );

    return (
        <button className={classNameValue} {...rest}/>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};


export default Button;