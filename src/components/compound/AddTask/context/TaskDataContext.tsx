import React, { useState } from 'react';

export interface TaskDataInterface {
  date?: Date;
  timeEstimate?: number;
  name?: string;
  description?: string;
  isCompleted?: boolean;
  taskIncome?: number;
  taskExpense?: number;
  clientId?: string;
}

type TaskDataContextType = {
  data: TaskDataInterface;
  setData: (data: object) => void;
};

export const TaskDataContext = React.createContext<TaskDataContextType>({
  data: {},
  setData: (data: object) => {}
});

interface Props {
  children: React.ReactNode;
}

const TaskDataContextProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<TaskDataInterface>({});
  return <TaskDataContext.Provider value={{ data, setData }}>{children}</TaskDataContext.Provider>;
};

export default TaskDataContextProvider;
