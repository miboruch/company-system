import React, { useContext } from 'react';
import { addEmployeeSteps } from '../../utils/addEmployeeSteps';
import CompoundStepBox from '../../../../molecules/CompoundStepBox/CompoundStepBox';
import { ListWrapper } from '../../../../../styles/compoundStyles';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { EmployeeDataContext } from '../../context/EmployeeDataContext';

interface Props {}

const StepList: React.FC<Props> = () => {
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
