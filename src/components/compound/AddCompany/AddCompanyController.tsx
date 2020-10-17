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
  height: 100vh;

  ${({ theme }) => theme.mq.hdReady} {
    width: 80%;
    height: 80vh;
    background-color: ${({ theme }) => theme.colors.white};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const AddCompanyController: React.FC<Props> = ({ isOpen, setOpen }) => {
  // TODO: gsap animation to open/close component
  return (
    <CompanyDataContextProvider>
      <PageContextProvider>
        <MainWrapper isOpen={isOpen}>
          <Wrapper>
            <AddCompanyHeader setBoxState={setOpen} />
            <AddCompanyTemplate pageIndex={0}>
              <MainCompanyInfo />
            </AddCompanyTemplate>
            <AddCompanyTemplate pageIndex={1} withoutPadding={true}>
              <MapPage />
            </AddCompanyTemplate>
          </Wrapper>
        </MainWrapper>
      </PageContextProvider>
    </CompanyDataContextProvider>
  );
};

export default AddCompanyController;
