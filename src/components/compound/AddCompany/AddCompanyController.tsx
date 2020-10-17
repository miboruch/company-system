import React from 'react';
import styled from 'styled-components';
import PageContextProvider from './context/PageContext';
import AddCompanyTemplate from './templates/AddCompanyTemplate/AddCompanyTemplate';
import AddCompanyHeader from './components/AddCompanyHeader/AddCompanyHeader';
import MainCompanyInfo from './pages/MainCompanyInfo';
import CompanyDataContextProvider from './context/CompanyDataContext';
import MapPage from './pages/MapPage';

interface MainWrapperInterface {
  isOpen: boolean;
}

const MainWrapper = styled.div<MainWrapperInterface>`
  width: 100%;
  min-height: 100vh;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.white};
  top: 0;
  left: 0;
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  ${({ theme }) => theme.mq.hdReady} {
    background-color: rgba(0, 0, 0, 0.6);
    display: grid;
    place-items: center;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 80px);

  ${({ theme }) => theme.mq.hdReady} {
    width: 80%;
    height: 80vh;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const AddCompanyController: React.FC<Props> = ({ isOpen, setOpen }) => {
  // TODO: gsap animation to open/close component
  return (
    <MainWrapper isOpen={isOpen}>
      <Wrapper>
        <CompanyDataContextProvider>
          <PageContextProvider>
            <AddCompanyHeader setBoxState={setOpen} />
            <AddCompanyTemplate pageIndex={0}>
              <MainCompanyInfo />
            </AddCompanyTemplate>
            <AddCompanyTemplate pageIndex={1} withoutPadding={true}>
              <MapPage />
            </AddCompanyTemplate>
          </PageContextProvider>
        </CompanyDataContextProvider>
      </Wrapper>
    </MainWrapper>
  );
};

export default AddCompanyController;
