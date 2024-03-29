import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';

import { ListBox, Spinner, CloseButton, MonthDropdown } from 'components';
import { modalOpenAnimation } from 'animations/animations';
import { EmployeeModel } from 'types';
import { AppState, useAppDispatch } from 'store/store';
import { MonthInterface, months } from 'utils/config';
import { getEmployeeHours, getEmployeeSalary } from 'ducks/employees/employees-data/employees-data-creators';

import { Heading, Paragraph, SpinnerWrapper } from 'styles';
import { CloseButtonWrapper } from 'styles/compoundControllerStyles';
import { StyledWrapper, Box, ListWrapper, ContentWrapper, StyledHeading, TextWrapper, Span } from './AdminStatistics.styles';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

const AdminStatistics: React.FC<Props> = ({ isOpen, handleClose }) => {
  const dispatch = useAppDispatch();
  const { allCompanyEmployees, areEmployeesLoading } = useSelector((state: AppState) => state.employees.employeesData);

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeModel | null>(null);
  const [userSalary, setUserSalary] = useState<number>(0);
  const [userHours, setUserHours] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<MonthInterface | null>(null);
  const mainWrapperRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  useEffect(() => {
    const currentMonthIndex = new Date().getMonth();
    if (selectedEmployee) {
      dispatch(
        getEmployeeSalary({
          userId: selectedEmployee.userId._id,
          monthIndex: selectedMonth ? selectedMonth.index : currentMonthIndex,
          setSalary: setUserSalary
        })
      );
      dispatch(
        getEmployeeHours({
          userId: selectedEmployee.userId._id,
          monthIndex: selectedMonth ? selectedMonth.index : currentMonthIndex,
          setHours: setUserHours
        })
      );
    }
  }, [selectedEmployee?.userId, selectedMonth]);

  const selectedEmployeeSalary = selectedEmployee?.pricePerHour
    ? `${selectedEmployee.pricePerHour} zł/h`
    : `${selectedEmployee?.monthlyPrice} miesięcznie`;

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
          <CloseButton close={handleClose} />
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
                <Paragraph type={'text'}>Zarobki {selectedEmployeeSalary}</Paragraph>
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
