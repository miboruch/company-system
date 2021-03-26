import React, { useState } from 'react';

import EmployeeInfo from './components/EmployeeInfo/EmployeeInfo';
import AddEmployeeController from './components/AddEmployee/AddEmployeeController';
import EmployeeList from './components/EmployeeList/EmployeeList';
import { useQuery } from 'components/hooks';
import { ContentTemplate, GridWrapper, MenuTemplate } from 'components';

const Employee: React.FC = () => {
  const { query, removeQuery } = useQuery();
  const [filterText, setFilterText] = useState<string>('');

  const removeEmployeeQuery = () => removeQuery('employee');

  return (
    <MenuTemplate>
      <GridWrapper
        mobilePadding={false}
        pageName={'Pracownicy'}
        setFilterText={setFilterText}
        render={(isDeleteOpen, setDeleteOpen) => (
          <>
            <EmployeeList filterText={filterText} />
            <ContentTemplate isOpen={!!query.employee} close={removeEmployeeQuery}>
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
