import React from 'react';
import styled from 'styled-components';
import PageContextProvider from './context/PageContext';
import AddCompanyTemplate from './templates/AddCompanyTemplate/AddCompanyTemplate';
import AddCompanyHeader from './components/AddCompanyHeader/AddCompanyHeader';
import CompanyDataContextProvider from './context/CompanyDataContext';
import MainCompanyInfo from './pages/MainCompanyInfo/MainCompanyInfo';
import MapPage from './pages/MapPage/MapPage';
import AddressInfo from './pages/AddressInfo/AddressInfo';

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
    position: relative;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 30px;
    //display: flex;
    //flex-direction: column;
    //justify-content: center;
    //align-items: center;
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: 100px auto;
    grid-template-areas: 'title heading' 'list content';
  }
`;

const ListWrapper = styled.div`
  grid-area: list;
  display: none;

  ${({ theme }) => theme.mq.hdReady} {
    display: block;
  }
`;

const CompoundTitle = styled.h1`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 36px;
  font-weight: ${({ theme }) => theme.font.weight.demi};
  letter-spacing: -1px;
  padding: 0 2rem;
  display: none;

  ${({ theme }) => theme.mq.hdReady} {
    display: block;
    grid-area: title;
    align-self: center;
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
            <CompoundTitle>Dodaj firme</CompoundTitle>
            <ListWrapper>
              <p>list</p>
            </ListWrapper>
            <AddCompanyTemplate pageIndex={0}>
              <MainCompanyInfo />
            </AddCompanyTemplate>
            <AddCompanyTemplate pageIndex={1} withoutPadding={true}>
              <MapPage />
            </AddCompanyTemplate>
            <AddCompanyTemplate pageIndex={2}>
              <AddressInfo />
            </AddCompanyTemplate>
          </Wrapper>
        </MainWrapper>
      </PageContextProvider>
    </CompanyDataContextProvider>
  );
};

export default AddCompanyController;
