import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';

import { ListBox } from 'components';
import { useFetch, useShowContent, useQuery } from 'components/hooks';
import { fetchEmployees } from 'api';
import { listAnimation } from 'animations/animations';
import { AppState } from 'store/store';
import { EmployeeModel } from 'types';

import { AddIcon, AddWrapper, List, Paragraph } from 'styles';

interface Props {
  filterText: string;
  refreshDate: Date;
  handleAddEmployeeOpen: () => void;
}

const EmployeeList: React.FC<Props> = ({ filterText, refreshDate, handleAddEmployeeOpen }) => {
  const { setQuery } = useQuery();
  const { role } = useSelector((state: AppState) => state.auth.roles);

  const listRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const employeeData = useFetch(fetchEmployees(role), { dependencies: [refreshDate] });
  const { showContent, showNoContent, showLoader, showError } = useShowContent(employeeData);
  const { payload } = employeeData;

  useEffect(() => {
    showContent && listAnimation(tl, listRef);
  }, [showContent]);

  const employeeFilter = (employee: EmployeeModel) =>
    `${employee.userId.name} ${employee.userId.lastName}`.toLowerCase().includes(filterText.toLowerCase());

  const handleEmployeeSelect = (id: string) => () => setQuery('employee', id);

  return (
    <List ref={listRef} data-testid={'list'}>
      {showLoader && <Paragraph>Ładowanie</Paragraph>}
      {showNoContent && <Paragraph>Brak danych</Paragraph>}
      {showError && <Paragraph>Problem z wyświetleniem danych</Paragraph>}
      {showContent &&
        payload &&
        payload.employees
          .filter(employeeFilter)
          .map((employee) => (
            <ListBox
              key={employee._id}
              name={`${employee.userId.name} ${employee.userId.lastName}`}
              topDescription={new Date(employee.userId.dateOfBirth).toLocaleDateString()}
              bottomDescription={employee.userId.email}
              callback={handleEmployeeSelect(employee._id)}
              isEmpty={true}
              isCompanyBox={false}
            />
          ))}
      <AddWrapper onClick={handleAddEmployeeOpen}>
        <AddIcon />
        <Paragraph type={'add'}>Dodaj pracownika</Paragraph>
      </AddWrapper>
    </List>
  );
};

export default EmployeeList;
