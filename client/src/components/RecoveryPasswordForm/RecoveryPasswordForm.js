import React from "react";
import {Form, Formik, Field} from 'formik';
import Button from "../Button/Button";
import CustomErrorMessage from "../CustomErrorMessage/CustomErrorMessage";
import Input from "../Input/Input";
import {recoveryPasswordValidationSchema} from "../../validationSchemas/recoveryPasswordValidationSchema";
import {connect} from "react-redux";
import styles from './RecoveryPasswordForm.module.sass';

const RecoveryPasswordForm = ({values}) => {

    const fieldRender = (name, type, placeholder) => {
        return (
            <Field name={name}>
                {
                    fieldProps => (
                        <label className={styles.fieldWrapper}>
                            <Input className={styles.input} placeholder={placeholder} type={type} {...fieldProps}/>
                            <CustomErrorMessage className={styles.error} name={fieldProps.field.name}/>
                        </label>
                    )
                }
            </Field>
        );
    };

    return (
        <Formik
            initialValues={{ email: '', newPassword: ''}}
            onSubmit={values => {

            }}
            validationSchema={recoveryPasswordValidationSchema}
        >
            {formik=>(
                <div className={styles.formWrapper}>
                    <Form onSubmit={formik.handleSubmit}>
                        {fieldRender('email', 'email', 'Enter your email')}
                        {fieldRender('newPassword', 'text', 'Enter the new password')}
                        <Button type='submit'>reset password</Button>
                    </Form>
                </div>

            )}
        </Formik>
    )
};


const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(null, mapDispatchToProps)(RecoveryPasswordForm);