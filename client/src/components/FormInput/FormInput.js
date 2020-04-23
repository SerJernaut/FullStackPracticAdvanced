import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './FormInput.module.sass'
const FormInput = (props) => {

  const {label, input, type, container, meta: {touched,visited, error}} = props;

  const inputClassName = classNames( styles.input, {
    [styles.notValid ]: touched && error,
    [styles.valid]: visited && !error,
  });

  return (
    <div className={ container || styles.inputContainer }>
      <input { ...input } placeholder={ label } type={ type }
             className={ inputClassName }/>
      { styles.fieldWarning && ( touched &&
        ( error && <span className={ styles.fieldWarning }>{ error }</span> ) ) }
    </div>
  );
};

FormInput.propTypes = {
  notValid: PropTypes.string,
  valid: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.string,
  type: PropTypes.string,

}

export default FormInput;

