import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import gsap from 'gsap';
import PageContextProvider, { PageSettingEnum } from './context/PageContext';
import AddCompanyTemplate from './templates/AddCompanyTemplate/AddCompanyTemplate';
import AddCompanyHeader from './components/AddCompanyHeader/AddCompanyHeader';
import CompanyDataContextProvider from './context/CompanyDataContext';
import MainCompanyInfo from './pages/MainCompanyInfo/MainCompanyInfo';
import MapPage from './pages/MapPage/MapPage';
import AddressInfo from './pages/AddressInfo/AddressInfo';
import { StandardCompoundTitle } from '../../../styles/compoundStyles';
import StepList from './components/StepList/StepList';
import { useOutsideClick } from '../../../utils/customHooks';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getUserAdminCompanies, setAddCompanyOpen } from '../../../actions/companyActions';
import { modalOpenAnimation } from '../../../animations/animations';
import { MainWrapper, CloseButtonWrapper, Wrapper, ContentWrapper, CompoundTitle } from '../../../styles/compoundControllerStyles';

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const AddCompanyController: React.FC<ConnectedProps> = ({ isAddCompanyOpen, setAddCompanyOpen }) => {
  const mainWrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  // useOutsideClick(wrapperRef, isOpen, () => setOpen(false));

  useEffect(() => {
    modalOpenAnimation(tl, mainWrapperRef, wrapperRef);
  }, []);

  useEffect(() => {
    isAddCompanyOpen ? tl.play() : tl.reverse();
  }, [isAddCompanyOpen]);

  return (
    <CompanyDataContextProvider>
      <PageContextProvider>
        <MainWrapper ref={mainWrapperRef}>
          <Wrapper ref={wrapperRef}>
            <CloseButtonWrapper>
              <CloseButton setBoxState={() => setAddCompanyOpen(false)} />
            </CloseButtonWrapper>
            <AddCompanyHeader setBoxState={setAddCompanyOpen} />
            <CompoundTitle>Dodaj firme</CompoundTitle>
            <StandardCompoundTitle>Uzupełnij informacje o swojej firmie</StandardCompoundTitle>
            <StepList />
            <ContentWrapper>
              <AddCompanyTemplate pageIndex={PageSettingEnum.First}>
                <MainCompanyInfo />
              </AddCompanyTemplate>
              <AddCompanyTemplate pageIndex={PageSettingEnum.Second}>
                <MapPage />
              </AddCompanyTemplate>
              <AddCompanyTemplate pageIndex={PageSettingEnum.Third}>
                <AddressInfo />
              </AddCompanyTemplate>
            </ContentWrapper>
          </Wrapper>
        </MainWrapper>
      </PageContextProvider>
    </CompanyDataContextProvider>
  );
};

interface LinkStateProps {
  isAddCompanyOpen: boolean;
}

interface LinkDispatchProps {
  setAddCompanyOpen: (isOpen: boolean) => void;
}

const mapStateToProps = ({ companyReducer: { isAddCompanyOpen } }: AppState): LinkStateProps => {
  return { isAddCompanyOpen };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    setAddCompanyOpen: bindActionCreators(setAddCompanyOpen, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCompanyController);
