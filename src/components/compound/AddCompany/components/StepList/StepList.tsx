import React, { useContext } from 'react';

import CompoundStepBox from 'components/molecules/CompoundStepBox/CompoundStepBox';

import { addCompanySteps } from '../../utils/addCompanySteps';
import { ListWrapper } from 'styles/compoundStyles';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { CompanyDataContext } from '../../context/CompanyDataContext';

const StepList: React.FC = () => {
  const { data } = useContext(CompanyDataContext);
  const { setCurrentPage } = useContext(PageContext);
  const isStepCompleted = (page: PageSettingEnum): boolean => {
    switch (page) {
      case PageSettingEnum.First:
        return !!(data.name && data.nip && data.email && data.phoneNumber);
      case PageSettingEnum.Second:
        return !!(data.lat && data.long);
      case PageSettingEnum.Third:
        return !!(data.address && data.city && data.country);
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
