import { MainTaskInfo } from 'pages/Task/components/AddTask/context/TaskDataContext';

export const taskInfoValues = (data?: MainTaskInfo) => ({
  name: data?.name || '',
  description: data?.description || '',
  date: data?.date || new Date(),
  isCompleted: data?.isCompleted || false,
  employees: data?.employees || []
});
