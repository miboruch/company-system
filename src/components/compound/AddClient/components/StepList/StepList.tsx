import React, { useContext } from 'react';
import { PageContext } from '../../context/PageContext';
import { ClientDataContext } from '../../context/ClientDataContext';
import { PageSettingEnum } from '../../context/PageContext';
import { ListWrapper } from '../../../../../styles/compoundStyles';
import CompoundStepBox from '../../../../molecules/CompoundStepBox/CompoundStepBox';
import { addClientSteps } from '../../utils/AddClientSteps';

interface Props {}

const StepList: React.FC<Props> = () => {
  const { data } = useContext(ClientDataContext);
  const { setCurrentPage } = useContext(PageContext);
  const isStepCompleted = (page: PageSettingEnum): boolean => {
    switch (page) {
      case PageSettingEnum.First:
        return !!(data.name && data.address && data.email && data.phoneNumber && data.city && data.country);
      case PageSettingEnum.Second:
        return !!(data.lat && data.long);
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
