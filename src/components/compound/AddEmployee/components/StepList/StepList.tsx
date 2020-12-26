import React, { useContext } from 'react';

import CompoundStepBox from 'components/molecules/CompoundStepBox/CompoundStepBox';

import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { addEmployeeSteps } from '../../utils/addEmployeeSteps';
import { ListWrapper } from 'styles/compoundStyles';
import { EmployeeDataContext } from '../../context/EmployeeDataContext';

const StepList: React.FC = () => {
  const { data } = useContext(EmployeeDataContext);
  const { setCurrentPage } = useContext(PageContext);
  const isStepCompleted = (page: PageSettingEnum): boolean => {
    switch (page) {
      case PageSettingEnum.First:
        return !!(data.userId || data.registerWithMail);
      case PageSettingEnum.Second:
        return !!(data.pricePerHour || data.monthlyPrice);
    }
  };

  return (
    <ListWrapper>
      {addEmployeeSteps.map(({ stepName, description, pageIndex }) => (
        <CompoundStepBox
          key={pageIndex}
          onClick={() => setCurrentPage(pageIndex)}
          stepName={stepName}
          description={description}
          stepNumber={pageIndex + 1}
          isCompleted={isStepCompleted(pageIndex)}
          allSteps={addEmployeeSteps.length}
        />
      ))}
    </ListWrapper>
  );
};

export default StepList;
