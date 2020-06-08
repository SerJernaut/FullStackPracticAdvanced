import React from 'react';
import {Form, Formik, Field} from 'formik';
import styles from './EventsForm.module.sass';
import Label from "../Label/Label";
import Input from "../Input/Input";
import Button from "../Button/Button";
import {DatePickerField} from "../../../../components/DatePickerField/DatePickerField";
import CustomErrorMessage from "../CustomErrorMessage/CustomErrorMessage";
import {createEventAction} from "../../../../actions/actionCreator";
import {connect} from "react-redux";
import moment from "moment";
import {eventsValidationSchema} from "../../eventsValidationSchema";


const EventsForm = (props) => {

    const resetButtonClickHandler = (formik, field, value) => {
        formik.setFieldValue(field, value)
    }

    return (
        <Formik
            initialValues={{ eventName: ''}}
            onSubmit={(values,{resetForm})=> {
                const eventCreationDate = new Date();
                props.newEvent(values, eventCreationDate);
                resetForm()

            }}
            validationSchema={eventsValidationSchema}
        >
            {formik=>(
                <div className={styles.formWrapper}>
                    <Form onSubmit={formik.handleSubmit} className={styles.eventsForm}>
                        <span>enter the name of event</span>
                        <Field key='eventName' name='eventName' type='text' placeholder='Enter the event name'>
                            {
                                fieldProps => (
                                    <Label className={styles.label}>
                                        <Input className={styles.eventNameInput} {...fieldProps}/>
                                        <CustomErrorMessage className={styles.warningMessage} name='eventName'/>
                                    </Label>
                                )
                            }
                        </Field>

                        <div className={styles.eventDateWrapper}>
                            <div className={styles.eventDateContainer}>
                                <DatePickerField name='eventDate' autoComplete='off' timeIntervals={1} dateFormat="Pp" placeholderText={'Click and choose event date'} minDate={moment().toDate()}  showTimeSelect/>
                                <Button onClick={()=>{
                                    resetButtonClickHandler(formik, 'eventDate', '')
                                }}>reset event date</Button>
                            </div>
                            <CustomErrorMessage className={styles.warningMessage} name='eventDate'/>
                        </div>
                        <div className={styles.eventDateWrapper}>
                            <div className={styles.eventDateContainer}>
                            <DatePickerField name='notifyDate' autoComplete='off' timeIntervals={1} dateFormat="Pp" placeholderText={'Click and choose notify date'} minDate={moment().toDate()} maxDate={formik.values["eventDate"]}  showTimeSelect/>
                            <Button onClick={()=>{
                                resetButtonClickHandler(formik, 'notifyDate', '')
                            }}>reset notify date</Button>
                            </div>
                            <CustomErrorMessage className={styles.warningMessage} name='notifyDate'/>
                        </div>
                        <Button type='submit'>create event</Button>
                    </Form>
                </div>

            )}
        </Formik>
    )
};


const mapDispatchToProps = (dispatch) => {
    return {
        newEvent: (values, eventCreationDate) => dispatch(createEventAction(values, eventCreationDate)),
    };
};

export default connect(null, mapDispatchToProps)(EventsForm);