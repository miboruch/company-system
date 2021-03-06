import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';

import { ListBox } from 'components';
import { useFetch, useShowContent } from 'components/hooks';
import { fetchEmployees } from 'api';
import { listAnimation } from 'animations/animations';
import { selectEmployee } from 'ducks/employees/employees-toggle/employees-toggle-creators';
import { setAddNewEmployeeOpen } from 'ducks/employees/employees-toggle/employees-toggle';
import { AppState, useAppDispatch } from 'store/store';
import { EmployeeModel } from 'types';

import { AddIcon, AddWrapper, List, Paragraph } from 'styles';

interface Props {
  filterText: string;
}

const EmployeeList: React.FC<Props> = ({ filterText }) => {
  const dispatch = useAppDispatch();
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const employeeData = useFetch<typeof fetchEmployees>(fetchEmployees(role));
  const { showContent, showNoContent, showLoader, showError } = useShowContent(employeeData);
  const { payload } = employeeData;

  useEffect(() => {
    showContent && listAnimation(tl, listRef);
  }, [showContent]);

  const handleAddEmployeeOpen = () => dispatch(setAddNewEmployeeOpen(true));
  const employeeFilter = (employee: EmployeeModel) =>
    `${employee.userId.name} ${employee.userId.lastName}`.toLowerCase().includes(filterText.toLowerCase());

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
  );
};

export default EmployeeList;
