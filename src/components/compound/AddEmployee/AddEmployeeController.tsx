import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useDispatch, useSelector } from 'react-redux';

import EmployeeDataContextProvider from './context/EmployeeDataContext';
import PageContextProvider from './context/PageContext';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import StepList from './components/StepList/StepList';
import AddEmployeeTemplate from './templates/AddEmployeeTemplate';
import AddEmployeeHeader from './components/AddEmployeeHeader/AddEmployeeHeader';
import SelectEmployee from './pages/SelectEmployee/SelectEmployee';
import SalaryPage from './pages/SalaryPage/SalaryPage';

import { AppState } from '../../../store/store';
import { PageSettingEnum } from './context/PageContext';
import { setAddNewEmployeeOpen } from '../../../ducks/employees/employees-toggle/employees-toggle';
import { modalOpenAnimation } from '../../../animations/animations';
import { MainWrapper, CompoundTitle, CloseButtonWrapper, ContentWrapper, Wrapper } from '../../../styles/compoundControllerStyles';
import { StandardCompoundTitle } from '../../../styles/compoundStyles';

const AddEmployeeController: React.FC = () => {
  const dispatch = useDispatch();
  const { isAddNewOpen } = useSelector((state: AppState) => state.employees.employeesToggle);

  const mainWrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    modalOpenAnimation(tl, mainWrapperRef, wrapperRef);
  }, []);

  useEffect(() => {
    isAddNewOpen ? tl.play() : tl.reverse();
  }, [isAddNewOpen]);

  return (
    <EmployeeDataContextProvider>
      <PageContextProvider>
        <MainWrapper ref={mainWrapperRef}>
          <Wrapper ref={wrapperRef}>
            <CloseButtonWrapper>
              <CloseButton close={() => dispatch(setAddNewEmployeeOpen(false))} />
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
