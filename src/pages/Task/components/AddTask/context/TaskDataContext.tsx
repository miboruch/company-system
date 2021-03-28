import React, { useState } from 'react';

export interface MainTaskInfo {
  name: string;
  description: string;
  date: Date;
  isCompleted: boolean;
  employees: string[];
}

type TaskDataContextType = {
  mainData?: MainTaskInfo;
  setMainData: (data: MainTaskInfo) => void;
};

export const TaskDataContext = React.createContext<TaskDataContextType>({
  mainData: undefined,
  setMainData: (data: MainTaskInfo) => {}
});

interface Props {
  children: React.ReactNode;
}

const TaskDataContextProvider: React.FC<Props> = ({ children }) => {
  const [mainData, setMainData] = useState<MainTaskInfo>();

  return <TaskDataContext.Provider value={{ mainData, setMainData }}>{children}</TaskDataContext.Provider>;
};

export default TaskDataContextProvider;
