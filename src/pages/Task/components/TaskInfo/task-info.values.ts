import { TaskModel } from 'types';
import { TaskValues } from 'api';

export const prepareValues = (task: TaskModel | null): TaskValues => ({
  name: task?.name || '',
  description: task?.description || '',
  timeEstimate: task?.timeEstimate || 0,
  clientId: task?.clientId,
  taskIncome: task?.taskIncome ? task.taskIncome : 0,
  taskExpense: task?.taskExpense ? task.taskExpense : 0,
  isCompleted: task?.isCompleted || false,
  date: task?.date ? new Date(task.date) : new Date()
});
