import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import EmployeeInfo from './components/EmployeeInfo/EmployeeInfo';
import AddEmployeeController from './components/AddEmployee/AddEmployeeController';
import EmployeeList from './components/EmployeeList/EmployeeList';
import { ContentTemplate, GridWrapper, MenuTemplate, DeletePopup } from 'components';
import { setEmployeeInfoOpen } from 'ducks/employees/employees-toggle/employees-toggle';
import { AppState, useAppDispatch } from 'store/store';
import { UserRole } from 'ducks/auth/roles/roles';
import { getAllAppUsers } from 'ducks/users/all-users-creators';
import { useQuery } from 'components/hooks';

const Employee: React.FC = () => {
  const dispatch = useAppDispatch();
  const {setQuery, query, resetQueries} = useQuery();
  const [isInfoOpen, setInfoOpen] = useState<boolean>(false);
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const { selectedEmployee, isEmployeeInfoOpen } = useSelector((state: AppState) => state.employees.employeesToggle);
  const [filterText, setFilterText] = useState<string>('');

  const handleEmployeeInfoClose = () => dispatch(setEmployeeInfoOpen(false));

  useEffect(() => {
    role === UserRole.Admin && dispatch(getAllAppUsers());
  }, []);

  useEffect(() => {
    setInfoOpen(!!query.employee);
  }, [query.employee]);

  return (
    <MenuTemplate>
      <GridWrapper
        mobilePadding={false}
        pageName={'Pracownicy'}
        setFilterText={setFilterText}
        render={(isDeleteOpen, setDeleteOpen) => (
          <>
            <EmployeeList filterText={filterText} />
            <ContentTemplate isOpen={isInfoOpen} close={resetQueries}>
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
        )}
      />
    </MenuTemplate>
  );
};

export default Employee;
