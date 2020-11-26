import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { EmployeeDataInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../store/test-store';
import ListBox from '../../molecules/ListBox/ListBox';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { SpinnerWrapper } from '../../../styles/shared';
import { getEmployeeHours, getEmployeeSalary } from '../../../actions/employeeActions';
import Spinner from '../../atoms/Spinner/Spinner';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import gsap from 'gsap';
import { modalOpenAnimation } from '../../../animations/animations';
import { CloseButtonWrapper } from '../../../styles/compoundControllerStyles';
import { Heading, Paragraph } from '../../../styles/typography/typography';
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

const StyledHeading = styled(Heading)`
  margin-left: 3rem;
`;

const TextWrapper = styled.div<TextWrapperInterface>`
  margin-top: 4rem;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
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
          <CloseButton close={() => setOpen(false)} />
        </CloseButtonWrapper>
        <ListWrapper>
          <StyledHeading>Pracownicy</StyledHeading>
          {allCompanyEmployees.map((employee) => (
            <ListBox
              key={employee._id}
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
              <Heading>
                {selectedEmployee?.userId.name} {selectedEmployee?.userId.lastName}
              </Heading>
              {/*<Dropdown options={months} onChange={handleMonthSelect} labelText={'Wybierz miesiąc'} />*/}
              <Paragraph type={'subparagraph'}>Statystyki użytkownika w miesiącu: Listopad</Paragraph>
              <Paragraph type={'text'}>Zarobki {selectedEmployee?.pricePerHour ? `${selectedEmployee.pricePerHour} zł/h` : `${selectedEmployee?.monthlyPrice} miesięcznie`}</Paragraph>
              <Paragraph type={'text'}>
                Ilość przepracowanych godzin: <Span>{userHours}</Span>
              </Paragraph>
              <Paragraph type={'text'}>
                Wynagrodzenie: <Span>{userSalary} zł</Span>
              </Paragraph>
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
