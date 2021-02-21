import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';

import EmployeeInfo from 'components/organisms/EmployeeInfo/EmployeeInfo';
import DeletePopup from 'components/molecules/DeletePopup/DeletePopup';
import AddEmployeeController from 'components/compound/AddEmployee/AddEmployeeController';
import { ListBox, Spinner, GridWrapper } from 'components/index';
import ContentTemplate from 'components/templates/ContentTemplate/ContentTemplate';

import { EmployeeDataInterface } from 'types/modelsTypes';
import { AppState, useAppDispatch } from 'store/store';
import { listAnimation } from 'animations/animations';
import { selectEmployee } from 'ducks/employees/employees-toggle/employees-toggle-creators';
import { setEmployeeInfoOpen, setAddNewEmployeeOpen } from 'ducks/employees/employees-toggle/employees-toggle';
import { Paragraph } from 'styles/typography/typography';
import { SpinnerWrapper, List, AddIcon, AddWrapper } from 'styles/shared';
import { getAllCompanyEmployees } from 'ducks/employees/employees-data/employees-data-creators';

const EmployeesPageContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedEmployee, isEmployeeInfoOpen } = useSelector((state: AppState) => state.employees.employeesToggle);
  const { allCompanyEmployees, areEmployeesLoading } = useSelector((state: AppState) => state.employees.employeesData);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const filterByEmployeeName = (filterText: string, allEmployees: EmployeeDataInterface[]): EmployeeDataInterface[] => {
    return allEmployees.filter((employee) =>
      `${employee.userId.name} ${employee.userId.lastName}`.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  const handleEmployeeInfoClose = () => dispatch(setEmployeeInfoOpen(false));
  const handleAddEmployeeOpen = () => dispatch(setAddNewEmployeeOpen(true));

  useEffect(() => {
    listAnimation(tl, listRef, areEmployeesLoading);
  }, [areEmployeesLoading]);

  useEffect(() => {
    dispatch(getAllCompanyEmployees());
    // allCompanyEmployees.length === 0 && getAllCompanyEmployees();
  }, []);

  return (
    <GridWrapper
      mobilePadding={false}
      pageName={'Pracownicy'}
      setFilterText={setFilterText}
      render={(isDeleteOpen, setDeleteOpen) =>
        areEmployeesLoading ? (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        ) : (
          <>
            <List ref={listRef} data-testid={'list'}>
              {filterByEmployeeName(filterText, allCompanyEmployees).map((employee) => (
                <ListBox
                  key={employee._id}
                  name={`${employee.userId.name} ${employee.userId.lastName}`}
                  topDescription={new Date(employee.userId.dateOfBirth).toLocaleDateString()}
                  bottomDescription={employee.userId.email}
                  callback={() => dispatch(selectEmployee(employee))}
                  isEmpty={true}
                  isCompanyBox={false}
                />
              ))}
              <AddWrapper onClick={handleAddEmployeeOpen}>
                <AddIcon />
                <Paragraph type={'add'}>Dodaj pracownika</Paragraph>
              </AddWrapper>
            </List>
            <ContentTemplate isOpen={isEmployeeInfoOpen} close={handleEmployeeInfoClose}>
              <EmployeeInfo setDeleteOpen={setDeleteOpen} />
            </ContentTemplate>
            <DeletePopup
              isOpen={isDeleteOpen}
              setOpen={setDeleteOpen}
              headerText={'Usuń pracownika'}
              text={`${selectedEmployee?.userId.name} ${selectedEmployee?.userId.lastName}`}
            />
            <AddEmployeeController />
          </>
        )
      }
    />
  );
};

export default EmployeesPageContent;
