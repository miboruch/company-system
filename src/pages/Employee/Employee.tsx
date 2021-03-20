import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import EmployeeInfo from './components/EmployeeInfo/EmployeeInfo';
import AddEmployeeController from './components/AddEmployee/AddEmployeeController';
import EmployeeList from './components/EmployeeList/EmployeeList';
import { useQuery } from 'components/hooks';
import { ContentTemplate, GridWrapper, MenuTemplate } from 'components';
import { AppState, useAppDispatch } from 'store/store';
import { UserRole } from 'ducks/auth/roles/roles';
import { getAllAppUsers } from 'ducks/users/all-users-creators';

const Employee: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, resetQueries } = useQuery();
  const [filterText, setFilterText] = useState<string>('');

  const { role } = useSelector((state: AppState) => state.auth.roles);

  useEffect(() => {
    role === UserRole.Admin && dispatch(getAllAppUsers());
  }, []);

  return (
    <MenuTemplate>
      <GridWrapper
        mobilePadding={false}
        pageName={'Pracownicy'}
        setFilterText={setFilterText}
        render={(isDeleteOpen, setDeleteOpen) => (
          <>
            <EmployeeList filterText={filterText} />
            <ContentTemplate isOpen={!!query.employee} close={resetQueries}>
              <EmployeeInfo isDeleteOpen={isDeleteOpen} setDeleteOpen={setDeleteOpen} />
            </ContentTemplate>
            <AddEmployeeController />
          </>
        )}
      />
    </MenuTemplate>
  );
};

export default Employee;
