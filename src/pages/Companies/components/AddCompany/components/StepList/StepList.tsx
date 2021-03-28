import React, { useContext } from 'react';

import { CompoundStepBox } from 'components';
import { addCompanySteps } from '../../utils/addCompanySteps';
import { ListWrapper } from 'styles/compoundStyles';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { CompanyDataContext } from '../../context/CompanyDataContext';

const StepList: React.FC = () => {
  const { mainData, mapData } = useContext(CompanyDataContext);
  const { setCurrentPage } = useContext(PageContext);
  const isStepCompleted = (page: PageSettingEnum): boolean => {
    switch (page) {
      case PageSettingEnum.First:
        return !!(mainData?.name && mainData?.nip && mainData?.email && mainData?.phoneNumber);
      case PageSettingEnum.Second:
        return !!(mapData?.lat && mapData?.long);
      default:
        return false;
    }
  };

  return (
    <ListWrapper>
      {addCompanySteps.map(({ stepName, description, pageIndex }) => (
        <CompoundStepBox
          key={pageIndex}
          onClick={() => setCurrentPage(pageIndex)}
          stepName={stepName}
          description={description}
          stepNumber={pageIndex + 1}
          isCompleted={isStepCompleted(pageIndex)}
          allSteps={addCompanySteps.length}
        />
      ))}
    </ListWrapper>
  );
};

export default StepList;
