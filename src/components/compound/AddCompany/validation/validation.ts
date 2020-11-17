import * as Yup from 'yup';

export const MainCompanyDataSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Nazwa jest za krótka').max(50, 'Nazwa jest za długa').required('To pole jest wymagane'),
  nip: Yup.string().min(10, 'Za krótki NIP').max(50, 'Za długi NIP').required('To pole jest wymagane'),
  email: Yup.string().email('Niepoprawny email').required('To pole jest wymagane'),
  phoneNumber: Yup.string().min(9, 'Numer telefonu jest za krótki').max(14, 'Numer telefonu jest za długi').required('To pole jest wymagane')
});

export const AddressDataSchema = Yup.object().shape({
  address: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane'),
  city: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane'),
  country: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane')
});
