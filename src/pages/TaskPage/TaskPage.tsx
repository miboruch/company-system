import React from 'react';
import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import TaskPageContent from '../../components/organisms/TaskPageContent/TaskPageContent';

interface Props {}

const TaskPage: React.FC<Props> = () => {
  return (
    <MenuTemplate>
      <TaskPageContent />
    </MenuTemplate>
  );
};

export default TaskPage;
