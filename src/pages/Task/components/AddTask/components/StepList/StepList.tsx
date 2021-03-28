import React, { useContext } from 'react';

import { CompoundStepBox } from 'components';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { addTaskSteps } from '../../utils/addTaskSteps';
import { TaskDataContext } from '../../context/TaskDataContext';

import { ListWrapper } from 'styles/compoundStyles';

const StepList: React.FC = () => {
  const { mainData } = useContext(TaskDataContext);
  const { setCurrentPage } = useContext(PageContext);
  const isStepCompleted = (page: PageSettingEnum): boolean => {
    switch (page) {
      case PageSettingEnum.First:
        return !!(mainData?.name && mainData?.description && mainData?.date);
      default:
        return false;
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
