import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { Paragraph } from '../../../styles/typography/typography';
import { SpinnerWrapper, List, AddIcon, AddWrapper } from '../../../styles/shared';
import ListBox from '../../molecules/ListBox/ListBox';
import gsap from 'gsap';
import ContentTemplate from '../../templates/ContentTemplate/ContentTemplate';
import { AppState, useAppDispatch } from '../../../store/test-store';
import { getAllCompanyEmployees } from '../../../ducks/employees/employees-data/employees-data-creators';
import { selectEmployee } from '../../../ducks/employees/employees-toggle/employees-toggle-creators';
import { EmployeeDataInterface } from '../../../types/modelsTypes';
import Spinner from '../../atoms/Spinner/Spinner';
import EmployeeInfo from '../EmployeeInfo/EmployeeInfo';
import { listAnimation } from '../../../animations/animations';
import DeletePopup from '../../molecules/DeletePopup/DeletePopup';
import AddEmployeeController from '../../compound/AddEmployee/AddEmployeeController';
import { setEmployeeInfoOpen, setAddNewEmployeeOpen } from '../../../ducks/employees/employees-toggle/employees-toggle';

const EmployeesPageContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedEmployee, isEmployeeInfoOpen } = useSelector((state: AppState) => state.employees.employeesToggle);
  const { allCompanyEmployees, areEmployeesLoading } = useSelector((state: AppState) => state.employees.employeesData);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const filterByEmployeeName = (filterText: string, allEmployees: EmployeeDataInterface[]): EmployeeDataInterface[] => {
    return allEmployees.filter((employee) => `${employee.userId.name} ${employee.userId.lastName}`.toLowerCase().includes(filterText.toLowerCase()));
  };

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
            <List ref={listRef}>
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
              <AddWrapper onClick={() => dispatch(setAddNewEmployeeOpen(true))}>
                <AddIcon />
                <Paragraph type={'add'}>Dodaj pracownika</Paragraph>
              </AddWrapper>
            </List>
            <ContentTemplate isOpen={isEmployeeInfoOpen} close={() => dispatch(setEmployeeInfoOpen(false))}>
              <EmployeeInfo setDeleteOpen={setDeleteOpen} />
            </ContentTemplate>
            <DeletePopup
              isOpen={isDeleteOpen}
              setOpen={setDeleteOpen}
              headerText={'Usuń pracownika'}
              text={`${selectedEmployee?.userId.name} ${selectedEmployee?.userId.lastName}`}
              callback={() => console.log('delete employee')}
            />
            <AddEmployeeController />
          </>
        )
      }
    />
  );
};

export default EmployeesPageContent;
