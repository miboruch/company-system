import React, { useContext } from 'react';

import CompoundStepBox from 'components/molecules/CompoundStepBox/CompoundStepBox';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { addTaskSteps } from '../../utils/addTaskSteps';
import { TaskDataContext } from '../../context/TaskDataContext';

import { ListWrapper } from 'styles/compoundStyles';

const StepList: React.FC = () => {
  const { data } = useContext(TaskDataContext);
  const { setCurrentPage } = useContext(PageContext);
  const isStepCompleted = (page: PageSettingEnum): boolean => {
    switch (page) {
      case PageSettingEnum.First:
        return !!(data.name && data.description && data.date);
      case PageSettingEnum.Second:
        return !!data.timeEstimate;
    }
  };

  return (
    <ListWrapper>
      {addTaskSteps.map(({ stepName, description, pageIndex }) => (
        <CompoundStepBox
          key={pageIndex}
          onClick={() => setCurrentPage(pageIndex)}
          stepName={stepName}
          description={description}
          stepNumber={pageIndex + 1}
          isCompleted={isStepCompleted(pageIndex)}
          allSteps={addTaskSteps.length}
        />
      ))}
    </ListWrapper>
  );
};

export default StepList;
