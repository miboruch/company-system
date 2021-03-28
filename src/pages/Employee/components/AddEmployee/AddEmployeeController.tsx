import React from 'react';

import EmployeeDataContextProvider from './context/EmployeeDataContext';
import PageContextProvider, { PageSettingEnum } from './context/PageContext';
import StepList from './components/StepList/StepList';
import AddEmployeeTemplate from './templates/AddEmployeeTemplate';
import AddEmployeeHeader from './components/AddEmployeeHeader/AddEmployeeHeader';
import SelectEmployee from './pages/SelectEmployee/SelectEmployee';
import SalaryPage from './pages/Salary/Salary';
import { CloseButton } from 'components';
import { useModal } from 'components/hooks';

import { MainWrapper, CompoundTitle, CloseButtonWrapper, ContentWrapper, Wrapper } from 'styles/compoundControllerStyles';
import { StandardCompoundTitle } from 'styles/compoundStyles';


interface Props {
  isOpen: boolean;
  handleClose: () => void;
  setRefreshDate: (date: Date) => void;
}

const AddEmployeeController: React.FC<Props> = ({isOpen, handleClose, setRefreshDate}) => {
  const { wrapperRef, boxRef } = useModal(isOpen);

  return (
    <EmployeeDataContextProvider>
      <PageContextProvider>
        <MainWrapper ref={wrapperRef}>
          <Wrapper ref={boxRef}>
            <CloseButtonWrapper>
              <CloseButton close={handleClose} />
            </CloseButtonWrapper>
            <AddEmployeeHeader />
            <CompoundTitle>Dodaj pracownika</CompoundTitle>
            <StandardCompoundTitle>Uzupełnij informacje o pracowniku</StandardCompoundTitle>
            <StepList />
            <ContentWrapper>
              <AddEmployeeTemplate pageIndex={PageSettingEnum.First}>
                <SelectEmployee />
              </AddEmployeeTemplate>
              <AddEmployeeTemplate pageIndex={PageSettingEnum.Second}>
                <SalaryPage />
              </AddEmployeeTemplate>
            </ContentWrapper>
          </Wrapper>
        </MainWrapper>
      </PageContextProvider>
    </EmployeeDataContextProvider>
  );
};

export default AddEmployeeController;
