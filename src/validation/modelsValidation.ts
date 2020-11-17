import * as Yup from 'yup';

export const ClientSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Nazwa jest za krótka').max(50, 'Nazwa jest za długa').required('To pole jest wymagane'),
  email: Yup.string().email('Niepoprawny email').required('To pole jest wymagane'),
  phoneNumber: Yup.string().min(9, 'Numer telefonu jest za krótki').max(14, 'Numer telefonu jest za długi').required('To pole jest wymagane'),
  address: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane'),
  city: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane'),
  country: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane')
});

export const TaskSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane'),
  description: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane'),
  date: Yup.date().required('To pole jest wymagane'),
  timeEstimate: Yup.number().min(0),
  clientId: Yup.string(),
  taskIncome: Yup.number().min(0),
  taskExpense: Yup.number().min(0)
});

export const EmployeeSchema = Yup.object().shape(
  {
    pricePerHour: Yup.number().when('monthlyPrice', { is: 0, then: Yup.number().required('To pole jest wymagane').min(1), otherwise: Yup.number() }),
    monthlyPrice: Yup.number().when('pricePerHour', { is: 0, then: Yup.number().required('To pole jest wymagane').min(1), otherwise: Yup.number() })
  },
  [['monthlyPrice', 'pricePerHour']]
);

export const CompanySchema = Yup.object().shape({
  name: Yup.string().min(2, 'Nazwa jest za krótka').max(50, 'Nazwa jest za długa').required('To pole jest wymagane'),
  nip: Yup.string().min(10, 'Za krótki NIP').max(50, 'Za długi NIP').required('To pole jest wymagane'),
  email: Yup.string().email('Niepoprawny email').required('To pole jest wymagane'),
  phoneNumber: Yup.string().min(9, 'Numer telefonu jest za krótki').max(14, 'Numer telefonu jest za długi').required('To pole jest wymagane'),
  address: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane'),
  city: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane'),
  country: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane')
});

export const AccountSchema = Yup.object().shape({
  email: Yup.string().email('Niepoprawny email').required('To pole jest wymagane'),
  name: Yup.string().min(2, 'Imię jest za krótkie').max(50, 'Imię jest za długie').required('To pole jest wymagane'),
  lastName: Yup.string().min(2, 'Nazwisko jest za krótkie').max(50, 'Nazwisko jest za długie').required('To pole jest wymagane'),
  dateOfBirth: Yup.date().required('To pole jest wymagane'),
  phoneNumber: Yup.string().min(9, 'Numer telefonu jest za krótki').max(14, 'Numer telefonu jest za długi').required('To pole jest wymagane'),
  address: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane'),
  city: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane'),
  country: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane')
});

export const IncomeExpenseSchema = Yup.object().shape({
  value: Yup.number().min(0, 'Minimalna wartość to 0').required('To pole jest wymagane'),
  description: Yup.string().required('To pole jest wymagane')
});

export const AttendanceSchema = Yup.object().shape({
  wasPresent: Yup.boolean().required('To pole jest wymagane'),
  hours: Yup.number().when('wasPresent', { is: true, then: Yup.number().required('To pole jest wymagane').min(0, 'Minimalna wartość to 0'), otherwise: Yup.number() })
});
