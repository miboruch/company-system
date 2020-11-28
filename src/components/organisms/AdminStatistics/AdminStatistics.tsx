import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { EmployeeDataInterface } from '../../../types/modelsTypes';
import { AppState, useAppDispatch } from '../../../store/test-store';
import ListBox from '../../molecules/ListBox/ListBox';
import { SpinnerWrapper } from '../../../styles/shared';
import { getEmployeeHours, getEmployeeSalary } from '../../../ducks/employees/employees-data/employees-data-creators';
import Spinner from '../../atoms/Spinner/Spinner';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import gsap from 'gsap';
import { modalOpenAnimation } from '../../../animations/animations';
import { CloseButtonWrapper } from '../../../styles/compoundControllerStyles';
import { Heading, Paragraph } from '../../../styles/typography/typography';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import { MonthInterface, months } from '../../../utils/staticData';
import MonthDropdown from '../../atoms/MonthDropdown/MonthDropdown';

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

const AdminStatistics: React.FC<Props> = ({ isOpen, setOpen }) => {
  const dispatch = useAppDispatch();
  const { allCompanyEmployees, areEmployeesLoading } = useSelector((state: AppState) => state.employees.employeesData);

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDataInterface | null>(null);
  const [userSalary, setUserSalary] = useState<number>(0);
  const [userHours, setUserHours] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<MonthInterface | null>(null);
  const mainWrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    const currentMonthIndex = new Date().getMonth();
    if (selectedEmployee) {
      dispatch(getEmployeeSalary({ userId: selectedEmployee.userId._id, monthIndex: selectedMonth ? selectedMonth.index : currentMonthIndex, setSalary: setUserSalary }));
      dispatch(getEmployeeHours({ userId: selectedEmployee.userId._id, monthIndex: selectedMonth ? selectedMonth.index : currentMonthIndex, setHours: setUserHours }));
    }
  }, [selectedEmployee?.userId, selectedMonth]);

  useEffect(() => {
    modalOpenAnimation(tl, mainWrapperRef, wrapperRef);
  }, []);

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

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
          <TextWrapper isVisible={!!selectedEmployee}>
            <Heading>
              {selectedEmployee?.userId.name} {selectedEmployee?.userId.lastName}
            </Heading>
            <MonthDropdown options={months} onChange={(month) => setSelectedMonth(month)} labelText={'Miesiąc'} />
            {areEmployeesLoading ? (
              <SpinnerWrapper>
                <Spinner />
              </SpinnerWrapper>
            ) : (
              <>
                <Paragraph type={'text'}>Zarobki {selectedEmployee?.pricePerHour ? `${selectedEmployee.pricePerHour} zł/h` : `${selectedEmployee?.monthlyPrice} miesięcznie`}</Paragraph>
                <Paragraph type={'text'}>
                  Ilość przepracowanych godzin: <Span>{userHours}</Span>
                </Paragraph>
                <Paragraph type={'text'}>
                  Wynagrodzenie: <Span>{userSalary} zł</Span>
                </Paragraph>
              </>
            )}
          </TextWrapper>
        </ContentWrapper>
      </Box>
    </StyledWrapper>
  );
};

export default AdminStatistics;
