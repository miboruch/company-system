import React from 'react';
import styled from 'styled-components';
import PageContextProvider, { PageSettingEnum } from './context/PageContext';
import AddCompanyTemplate from './templates/AddCompanyTemplate/AddCompanyTemplate';
import AddCompanyHeader from './components/AddCompanyHeader/AddCompanyHeader';
import CompanyDataContextProvider from './context/CompanyDataContext';
import MainCompanyInfo from './pages/MainCompanyInfo/MainCompanyInfo';
import MapPage from './pages/MapPage/MapPage';
import AddressInfo from './pages/AddressInfo/AddressInfo';
import CompoundStepBox from '../../molecules/CompoundStepBox/CompoundStepBox';
import { addCompanySteps } from './utils/AddCompanySteps';

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
    background-color: ${({ theme }) => theme.colors.blurBackground};
    display: grid;
    place-items: center;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  ${({ theme }) => theme.mq.hdReady} {
    width: 80%;
    //width: 90%;
    height: 80vh;
    position: relative;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 30px;
    overflow: hidden;
    //display: flex;
    //flex-direction: column;
    //justify-content: center;
    //align-items: center;
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: 150px auto;
    grid-template-areas: 'title heading' 'list content';
  }

  ${({ theme }) => theme.mq.fullHd} {
    width: 80%;
  }
`;

const ListWrapper = styled.div`
  grid-area: list;
  display: none;
  overflow: hidden;
  overflow-y: scroll;

  ${({ theme }) => theme.mq.hdReady} {
    display: flex;
    flex-direction: column;
  }
`;

const CompoundTitle = styled.h1`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 36px;
  font-weight: ${({ theme }) => theme.font.weight.demi};
  letter-spacing: -1px;
  padding: 0 4rem;
  display: none;

  ${({ theme }) => theme.mq.hdReady} {
    display: block;
    grid-area: title;
    align-self: center;
    justify-self: center;
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
            {/*TODO: create component with list to get access to data*/}
            <ListWrapper>
              {addCompanySteps.map(({ stepName, description, pageIndex }) => (
                <CompoundStepBox stepName={stepName} description={description} stepNumber={pageIndex + 1} isCompleted={false} allSteps={addCompanySteps.length} />
              ))}
            </ListWrapper>
            <AddCompanyTemplate pageIndex={PageSettingEnum.First}>
              <MainCompanyInfo />
            </AddCompanyTemplate>
            <AddCompanyTemplate pageIndex={PageSettingEnum.Second} withoutPadding={true}>
              <MapPage />
            </AddCompanyTemplate>
            <AddCompanyTemplate pageIndex={PageSettingEnum.Third}>
              <AddressInfo />
            </AddCompanyTemplate>
          </Wrapper>
        </MainWrapper>
      </PageContextProvider>
    </CompanyDataContextProvider>
  );
};

export default AddCompanyController;
