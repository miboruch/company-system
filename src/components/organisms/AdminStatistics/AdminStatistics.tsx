import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { EmployeeDataInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import ListBox from '../../molecules/ListBox/ListBox';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { SpinnerWrapper } from '../../../styles/shared';
import { getEmployeeHours, getEmployeeSalary } from '../../../actions/employeeActions';
import Spinner from '../../atoms/Spinner/Spinner';
import { Paragraph } from '../../../styles/shared';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import gsap from 'gsap';
import { modalOpenAnimation } from '../../../animations/animations';
import { CloseButtonWrapper } from '../../../styles/compoundControllerStyles';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import { months } from '../../../utils/staticData';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.blurBackground};
  display: grid;
  place-items: center;
  z-index: 1000;
`;

const Box = styled.div`
  width: 90%;
  height: 400px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 30px;
  overflow: hidden;

  ${({ theme }) => theme.mq.hdReady} {
    width: 1000px;
    height: 500px;
    display: flex;
    flex-direction: row;
  }
`;

const ListWrapper = styled.div`
  width: 300px;
  height: 100%;
  padding: 2rem 0;
  border-right: 1px solid ${({ theme }) => theme.colors.impactGray};
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem;
`;

interface TextWrapperInterface {
  isVisible: boolean;
}

const TextWrapper = styled.div<TextWrapperInterface>`
  margin-top: 4rem;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

const Heading = styled.h2`
  font-weight: ${({ theme }) => theme.mq.demi};
  padding: 3rem;
`;

const MainHeading = styled.h1`
  font-weight: ${({ theme }) => theme.mq.demi};
  margin-bottom: 3rem;
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.font.weight.book};
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const Text = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 2rem;
`;

const Span = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const AdminStatistics: React.FC<ConnectedProps> = ({ allCompanyEmployees, getEmployeeSalary, getEmployeeHours, isLoading, isOpen, setOpen }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDataInterface | null>(null);
  const [userSalary, setUserSalary] = useState<number>(0);
  const [userHours, setUserHours] = useState<number>(0);
  const mainWrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    if (selectedEmployee) {
      getEmployeeSalary(selectedEmployee.userId._id, 10, setUserSalary);
      getEmployeeHours(selectedEmployee.userId._id, 10, setUserHours);
    }
  }, [selectedEmployee?.userId]);

  useEffect(() => {
    modalOpenAnimation(tl, mainWrapperRef, wrapperRef);
  }, []);

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  const handleMonthSelect = (selected: string | null) => console.log(selected);

  return (
    <StyledWrapper ref={mainWrapperRef}>
      <Box ref={wrapperRef}>
        <CloseButtonWrapper>
          <CloseButton setBoxState={setOpen} />
        </CloseButtonWrapper>
        <ListWrapper>
          <Heading>Pracownicy</Heading>
          {allCompanyEmployees.map((employee) => (
            <ListBox
              name={`${employee.userId.name} ${employee.userId.lastName}`}
              topDescription={new Date(employee.userId.dateOfBirth).toLocaleDateString()}
              bottomDescription={employee.userId.email}
              callback={() => setSelectedEmployee(employee)}
              isCompanyBox={false}
              isEmpty={true}
            />
          ))}
        </ListWrapper>
        <ContentWrapper>
          {isLoading ? (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          ) : (
            <TextWrapper isVisible={!!selectedEmployee}>
              <MainHeading>
                {selectedEmployee?.userId.name} {selectedEmployee?.userId.lastName}
              </MainHeading>
              {/*<Dropdown options={months} onChange={handleMonthSelect} labelText={'Wybierz miesiąc'} />*/}
              <Text>Statystyki użytkownika w miesiącu: Listopad</Text>
              <Text>Zarobki {selectedEmployee?.pricePerHour ? `${selectedEmployee.pricePerHour} zł/h` : `${selectedEmployee?.monthlyPrice} miesięcznie`}</Text>
              <StyledParagraph>
                Ilość przepracowanych godzin: <Span>{userHours}</Span>
              </StyledParagraph>
              <StyledParagraph>
                Wynagrodzenie: <Span>{userSalary} zł</Span>
              </StyledParagraph>
            </TextWrapper>
          )}
        </ContentWrapper>
      </Box>
    </StyledWrapper>
  );
};

interface LinkStateProps {
  allCompanyEmployees: EmployeeDataInterface[];
  isLoading: boolean;
}

const mapStateToProps = ({ employeeReducer: { allCompanyEmployees, isLoading } }: AppState): LinkStateProps => {
  return { allCompanyEmployees, isLoading };
};

interface LinkDispatchProps {
  getEmployeeSalary: (userId: string, monthIndex: number, setSalary: (hours: number) => void) => void;
  getEmployeeHours: (userId: string, monthIndex: number, setHours: (hours: number) => void) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getEmployeeSalary: bindActionCreators(getEmployeeSalary, dispatch),
    getEmployeeHours: bindActionCreators(getEmployeeHours, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminStatistics);
