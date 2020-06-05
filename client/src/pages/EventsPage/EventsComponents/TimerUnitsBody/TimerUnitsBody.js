import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './TimerUnitsBody.module.sass';

const TimerUnitsBody = ({className, timerArr}) => {

    const classes = classNames(styles.timeUnitsContainer, className)

    return (
        <div className={classes}>
            {timerArr.map(([timeUnit, time], index) => (
                (
                    <span key={index}>{(time < 10) && `0`}{time}{timeUnit}</span>
                )
            ))}
        </div>
    );
};

TimerUnitsBody.propTypes = {
    timerArr: PropTypes.array.isRequired,
    className: PropTypes.string.isRequired
};

export default TimerUnitsBody;