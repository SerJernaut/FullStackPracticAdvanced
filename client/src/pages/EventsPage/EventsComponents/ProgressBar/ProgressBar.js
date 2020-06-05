import React from "react";
import styles from './ProgressBar.module.sass';
import classNames from 'classnames';

const ProgressBar = ({className, progress}) => {
    const progressBarClassNames = classNames(className, styles.progressDone)
    return (
        <div className={progressBarClassNames} style={{opacity: 1,
            width: `${progress}%`}}>
        </div>
    )
}

const withinOneHundred = (props, propName, componentName) =>  {
    componentName = componentName || 'ANONYMOUS';
    if (props[propName]) {
        let value = props[propName];
        if (typeof value === 'number') {
            return (value >= 1 && value <= 100) ? null : new Error(propName + ' in ' + componentName + " is not in range from 0 to 100");
        }
    }

    return null;
}

ProgressBar.propTypes = {
    progress: withinOneHundred
}

export default ProgressBar;