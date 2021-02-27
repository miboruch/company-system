import React, { useContext } from 'react';

import { CompoundStepBox } from 'components/index';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { ClientDataContext } from '../../context/ClientDataContext';
import { ListWrapper } from 'styles/compoundStyles';
import { addClientSteps } from '../../utils/AddClientSteps';

const StepList: React.FC = () => {
  const { data } = useContext(ClientDataContext);
  const { setCurrentPage } = useContext(PageContext);
  const isStepCompleted = (page: PageSettingEnum): boolean => {
    switch (page) {
      case PageSettingEnum.First:
        return !!(data.name && data.email && data.phoneNumber);
      case PageSettingEnum.Second:
        return !!(data.lat && data.long);
      case PageSettingEnum.Third:
        return !!(data.address && data.city && data.country);
    }
  };
  return (
    <ListWrapper>
      {addClientSteps.map(({ stepName, description, pageIndex }) => (
        <CompoundStepBox
          key={pageIndex}
          onClick={() => setCurrentPage(pageIndex)}
          stepName={stepName}
          description={description}
          stepNumber={pageIndex + 1}
          isCompleted={isStepCompleted(pageIndex)}
          allSteps={addClientSteps.length}
        />
      ))}
    </ListWrapper>
  );
};

export default StepList;
