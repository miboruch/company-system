import * as Yup from 'yup';

export const MainRegisterDataSchema = Yup.object().shape({
  email: Yup.string().email('Niepoprawny email').required('To pole jest wymagane'),
  name: Yup.string().min(2, 'Imię jest za krótkie').max(50, 'Imię jest za długie').required('To pole jest wymagane'),
  lastName: Yup.string().min(2, 'Nazwisko jest za krótkie').max(50, 'Nazwisko jest za długie').required('To pole jest wymagane'),
  dateOfBirth: Yup.date().required('To pole jest wymagane')
});

export const ContactDataSchema = Yup.object().shape({
  phoneNumber: Yup.string().min(9, 'Numer telefonu jest za krótki').max(14, 'Numer telefonu jest za długi').required('To pole jest wymagane'),
  address: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane'),
  city: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane'),
  country: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane')
});

export const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/^(?=.*\d)(?=.*[a-z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,25}$/)
    .required('To pole jest wymagane'),
  repeatedPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Hasło nie jest takie samo')
    .required('To pole jest wymagane')
});
