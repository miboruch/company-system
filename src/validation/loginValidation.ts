import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Niepoprawny email').required('To pole jest wymagane'),
  password: Yup.string()
    .matches(/^(?=.*\d)(?=.*[a-z])[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{8,25}$/)
    .required('To pole jest wymagane')
});
