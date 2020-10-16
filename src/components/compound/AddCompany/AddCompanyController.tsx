import React from 'react';
import styled from 'styled-components';
import PageContextProvider from './context/PageContext';
import AddCompanyTemplate from './templates/AddCompanyTemplate/AddCompanyTemplate';
import AddCompanyHeader from './components/AddCompanyHeader/AddCompanyHeader';
import MainCompanyInfo from './pages/MainCompanyInfo';

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
`;

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const AddCompanyController: React.FC<Props> = ({ isOpen, setOpen }) => {
  // TODO: gsap animation to open/close component
  return (
    <MainWrapper isOpen={isOpen}>
      <PageContextProvider>
        <AddCompanyHeader setBoxState={setOpen} />
        <AddCompanyTemplate pageIndex={0}>
          <MainCompanyInfo />
        </AddCompanyTemplate>
      </PageContextProvider>
    </MainWrapper>
  );
};

export default AddCompanyController;
