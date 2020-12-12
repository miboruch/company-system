import React from 'react';

import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import TaskPageContent from '../../components/organisms/TaskPageContent/TaskPageContent';

const TaskPage: React.FC = () => {
  return (
    <MenuTemplate>
      <TaskPageContent />
    </MenuTemplate>
  );
};

export default TaskPage;
