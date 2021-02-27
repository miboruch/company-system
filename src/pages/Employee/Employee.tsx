import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';

import EmployeeInfo from './components/EmployeeInfo/EmployeeInfo';
import AddEmployeeController from './components/AddEmployee/AddEmployeeController';
import { ContentTemplate, GridWrapper, ListBox, Spinner, MenuTemplate, DeletePopup } from 'components';
import { selectEmployee } from 'ducks/employees/employees-toggle/employees-toggle-creators';
import { setAddNewEmployeeOpen, setEmployeeInfoOpen } from 'ducks/employees/employees-toggle/employees-toggle';
import { listAnimation } from 'animations/animations';
import { Employee as EmployeeType } from 'types';
import { AppState, useAppDispatch } from 'store/store';
import { UserRole } from 'ducks/auth/roles/roles';
import { getAllAppUsers } from 'ducks/users/all-users-creators';
import { getAllCompanyEmployees } from 'ducks/employees/employees-data/employees-data-creators';
import { AddIcon, AddWrapper, List, Paragraph, SpinnerWrapper } from 'styles';

const Employee: React.FC = () => {
  const dispatch = useAppDispatch();
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const { selectedEmployee, isEmployeeInfoOpen } = useSelector((state: AppState) => state.employees.employeesToggle);
  const { allCompanyEmployees, areEmployeesLoading } = useSelector((state: AppState) => state.employees.employeesData);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const filterByEmployeeName = (filterText: string, allEmployees: EmployeeType[]): EmployeeType[] => {
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

  useEffect(() => {
    role === UserRole.Admin && dispatch(getAllAppUsers());
  }, []);

  return (
    <MenuTemplate>
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
    </MenuTemplate>
  );
};

export default Employee;
