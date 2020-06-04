import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './PageFooter.module.sass';

const PageFooter = ({children, className}) => {
    const footerClassNames = classNames(className, styles.footer)
    return (
        <footer className={footerClassNames}>
            {children}
        </footer>
    );
};

PageFooter.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default PageFooter;