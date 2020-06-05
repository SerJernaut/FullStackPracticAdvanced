import React from "react";
import DatePicker from "react-datepicker/es";
import {useField, useFormikContext} from "formik";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import styles from './DatePickerField.module.sass'

export const DatePickerField = ({ ...props}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    const fieldClassName = classNames({
        [styles.validValue]: meta.touched && !meta.error,
        [styles.invalidValue]: meta.touched && meta.error
    } );
    return (
        <DatePicker
            {...field}
            {...props}
            className={fieldClassName}
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
                setFieldValue(field.name, val);
            }}
        />
    );
};