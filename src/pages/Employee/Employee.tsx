import React, { useState } from 'react';

import EmployeeInfo from './components/EmployeeInfo/EmployeeInfo';
import AddEmployeeController from './components/AddEmployee/AddEmployeeController';
import EmployeeList from './components/EmployeeList/EmployeeList';
import { useQuery } from 'components/hooks';
import { ContentTemplate, GridWrapper, MenuTemplate } from 'components';

const Employee: React.FC = () => {
  const { query, removeQuery } = useQuery();
  const [filterText, setFilterText] = useState<string>('');
  const [isAddEmployeeOpen, setAddEmployeeOpen] = useState<boolean>(false);
  const [refreshDate, setRefreshDate] = useState<Date>(new Date());

  const removeEmployeeQuery = () => removeQuery('employee');

  const handleAddEmployeeOpen = (isOpen: boolean) => () => setAddEmployeeOpen(isOpen);

  return (
    <MenuTemplate>
      <GridWrapper
        mobilePadding={false}
        pageName={'Pracownicy'}
        setFilterText={setFilterText}
        render={(isDeleteOpen, setDeleteOpen) => (
          <>
            <EmployeeList
              filterText={filterText}
              refreshDate={refreshDate}
              handleAddEmployeeOpen={handleAddEmployeeOpen(false)}
            />
            <ContentTemplate isOpen={!!query.employee} close={removeEmployeeQuery}>
              <EmployeeInfo isDeleteOpen={isDeleteOpen} setDeleteOpen={setDeleteOpen} />
            </ContentTemplate>
            <AddEmployeeController
              isOpen={isAddEmployeeOpen}
              handleClose={handleAddEmployeeOpen(false)}
              setRefreshDate={setRefreshDate}
            />
          </>
        )}
      />
    </MenuTemplate>
  );
};

export default Employee;
