import React, { useState } from 'react';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';

interface Props {}

const TaskPageContent: React.FC<Props> = () => {
  const [filterText, setFilterText] = useState<string>('');

  return (
    <GridWrapper mobilePadding={false} pageName={'Zadania'} setFilterText={setFilterText}>
      <p>Hello</p>
    </GridWrapper>
  );
};

export default TaskPageContent;
