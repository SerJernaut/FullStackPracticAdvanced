import React            from 'react';
import PropTypes        from 'prop-types';
import classNames       from 'classnames';
import styles from './CustomErrorMessage.module.sass'
import {ErrorMessage} from "formik";

const CustomErrorMessage = ({ name, className, ...rest }) => {

    const classNameValue = classNames( styles.warningStyles, className );

    return (
        <ErrorMessage name={name}>
            {
                msg => <span {...rest} className={classNameValue}>{msg}</span>
            }
        </ErrorMessage>
    );
};

CustomErrorMessage.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    styles: PropTypes.object
};

export default CustomErrorMessage;