import React from 'react';
import styled from 'styled-components';
import PageContextProvider from './context/PageContext';
import AddCompanyTemplate from './templates/AddCompanyTemplate/AddCompanyTemplate';
import AddCompanyHeader from './components/AddCompanyHeader/AddCompanyHeader';

const MainWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.white};
  top: 0;
  left: 0;
  z-index: 1000;
`;

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const AddCompanyController: React.FC<Props> = ({ isOpen, setOpen }) => {
  // TODO: gsap animation to open/close component
  return (
    <MainWrapper>
      <PageContextProvider>
        <AddCompanyHeader />
        <AddCompanyTemplate pageIndex={0}>
          <p>Test - strona 1</p>
        </AddCompanyTemplate>
      </PageContextProvider>
    </MainWrapper>
  );
};

export default AddCompanyController;
