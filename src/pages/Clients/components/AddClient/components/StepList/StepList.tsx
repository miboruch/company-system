import React, { useContext } from 'react';

import { CompoundStepBox } from 'components/index';
import { PageContext, PageSettingEnum } from '../../context/PageContext';
import { ClientDataContext } from '../../context/ClientDataContext';
import { ListWrapper } from 'styles/compoundStyles';
import { addClientSteps } from '../../utils/AddClientSteps';

const StepList: React.FC = () => {
  const { mainData, mapData } = useContext(ClientDataContext);
  const { setCurrentPage } = useContext(PageContext);

  const isStepCompleted = (page: PageSettingEnum): boolean => {
    switch (page) {
      case PageSettingEnum.First:
        return !!(mainData?.name && mainData?.email && mainData?.phoneNumber);
      case PageSettingEnum.Second:
        return !!(mapData?.lat && mapData?.long);
      default:
        return false;
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
