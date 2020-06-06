import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './PageHeader.module.sass';

const PageHeader = ({children, className}) => {
    const headerClassNames = classNames(className, styles.header)
    return (
        <header className={headerClassNames}>
            {children}
        </header>
    );
};

PageHeader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    className: PropTypes.string
};

export default PageHeader;