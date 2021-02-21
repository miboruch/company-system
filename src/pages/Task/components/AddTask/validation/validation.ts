import * as Yup from 'yup';

export const TaskInfoSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane'),
  description: Yup.string().min(2, 'Minimum 2 znaki').required('To pole jest wymagane'),
  date: Yup.date().required('To pole jest wymagane'),
  isCompleted: Yup.boolean().required('To pole jest wymagane')
});

export const TaskSpecificInfoSchema = Yup.object().shape({
  timeEstimate: Yup.number().min(0),
  taskIncome: Yup.number().min(0),
  taskExpense: Yup.number().min(0)
});
