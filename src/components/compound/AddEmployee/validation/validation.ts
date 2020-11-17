import * as Yup from 'yup';

export const MainEmployeeSchema = Yup.object().shape({
  userId: Yup.string().when('registerWithMail', { is: false, then: Yup.string().required('To pole jest wymagane'), otherwise: Yup.string() }),
  registerWithMail: Yup.boolean().when('userId', { is: undefined, then: Yup.boolean().required('To pole jest wymagane'), otherwise: Yup.boolean() })
}, [['registerWithMail', 'userId']]);

export const EmployeeSalarySchema = Yup.object().shape({
  email: Yup.string().email('Niepoprawny adres email'),
  pricePerHour: Yup.number().when('monthlyPrice', { is: 0, then: Yup.number().required('To pole jest wymagane').min(1) }),
  monthlyPrice: Yup.number().when('pricePerHour', { is: 0, then: Yup.number().required('To pole jest wymagane').min(1) })
}, [['monthlyPrice', 'pricePerHour']]);
