import React, { useContext } from 'react';
import {addTaskSteps} from '../../utils/addTaskSteps';
import CompoundStepBox from '../../../../molecules/CompoundStepBox/CompoundStepBox';
import { ListWrapper } from '../../../../../styles/compoundStyles';
import {PageContext, PageSettingEnum} from '../../context/PageContext';
import {TaskDataContext} from '../../context/TaskDataContext';

interface Props {}

const StepList: React.FC<Props> = () => {
  const { data } = useContext(TaskDataContext);
  const { setCurrentPage } = useContext(PageContext);
  const isStepCompleted = (page: PageSettingEnum): boolean => {
    switch (page) {
      case PageSettingEnum.First:
        return !!(data.name && data.description && data.date);
      case PageSettingEnum.Second:
        return !!(data.timeEstimate);
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
