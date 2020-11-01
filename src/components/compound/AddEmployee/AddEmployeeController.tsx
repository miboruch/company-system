import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { connect } from 'react-redux';
import EmployeeDataContextProvider from './context/EmployeeDataContext';
import PageContextProvider from './context/PageContext';
import { MainWrapper, CompoundTitle, CloseButtonWrapper, ContentWrapper, Wrapper } from '../../../styles/compoundControllerStyles';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import { StandardCompoundTitle } from '../../../styles/compoundStyles';
import StepList from './components/StepList/StepList';
import AddEmployeeTemplate from './templates/AddEmployeeTemplate';
import { PageSettingEnum } from './context/PageContext';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { setAddNewEmployeeOpen } from '../../../actions/employeeActions';
import { modalOpenAnimation } from '../../../animations/animations';
import AddEmployeeHeader from './components/AddEmployeeHeader/AddEmployeeHeader';
import SelectEmployee from './pages/SelectEmployee/SelectEmployee';
import SalaryPage from './pages/SalaryPage/SalaryPage';

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const AddEmployeeController: React.FC<ConnectedProps> = ({ setAddNewEmployeeOpen, isAddNewOpen }) => {
  const mainWrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  // useOutsideClick(wrapperRef, isOpen, () => setOpen(false));

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
              <CloseButton setBoxState={() => setAddNewEmployeeOpen(false)} />
            </CloseButtonWrapper>
            <AddEmployeeHeader setBoxState={setAddNewEmployeeOpen} />
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

interface LinkStateProps {
  isAddNewOpen: boolean;
}

interface LinkDispatchProps {
  setAddNewEmployeeOpen: (isOpen: boolean) => void;
}

const mapStateToProps = ({ employeeReducer: { isAddNewOpen } }: AppState): LinkStateProps => {
  return { isAddNewOpen };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    setAddNewEmployeeOpen: bindActionCreators(setAddNewEmployeeOpen, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployeeController);
