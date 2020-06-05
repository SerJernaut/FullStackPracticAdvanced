import React      from 'react';
import PropTypes  from 'prop-types';

const Label = ({ className, ...rest }) => {

    return (
        <label className={className} {...rest}/>
    );
};

Label.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Label;