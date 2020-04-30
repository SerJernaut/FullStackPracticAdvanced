import * as Yup from 'yup';

const PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)[A-Za-z0-9_@#%!?\-^]{8,64}$/;

const wrongPasswordWarningMessage = `Password must contains from 8 to 64 characters(upper, lowercase letters or numbers) and starts from letter`

export const recoveryPasswordValidationSchema = Yup.object().shape({
    email: Yup.string().email().required().label('Email'),
    newPassword: Yup.string().required().matches(PASSWORD_PATTERN, wrongPasswordWarningMessage).label('NewPassword'),
});

