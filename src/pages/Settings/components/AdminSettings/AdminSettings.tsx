import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import RemoveAdminPopup from './components/RemoveAdminPopup/RemoveAdminPopup';
import { Spinner, ListBox, AddNewButton, notifications } from 'components';
import { useUser } from 'components/hooks';
import { CompanyOwnersModel } from 'types';
import { AppState, useAppDispatch } from 'store/store';
import { getAllCompanyEmployees } from 'ducks/employees/employees-data/employees-data-creators';
import { getCompanyOwners, addNewCompanyOwner } from 'ducks/company/company-owners/company-owners-creators';

import { SpinnerWrapper } from 'styles';
import { Wrapper, ColumnWrapper, Heading } from './AdminSettings.styles';

const AdminSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const { allCompanyEmployees } = useSelector((state: AppState) => state.employees.employeesData);

  const { areOwnersLoading, companyOwners } = useSelector((state: AppState) => state.company.companyOwners);

  const [isAddNewToggled, setAddNewToggled] = useState<boolean>(false);
  const [isRemoveOpen, setRemoveOpen] = useState<boolean>(false);
  const [companyOwnerToDelete, setCompanyOwnerToDelete] = useState<CompanyOwnersModel | null>(null);

  useEffect(() => {
    allCompanyEmployees.length === 0 && dispatch(getAllCompanyEmployees());
    dispatch(getCompanyOwners());
  }, []);

  const addCompanyOwner = (userId: string) => () => {
    dispatch(addNewCompanyOwner(userId));
  };

  const listBoxCallback = (owner: CompanyOwnersModel) => () => {
    if (owner._id === user?._id) {
      notifications.error('Nie możesz usunąc samego siebie');
    } else {
      setRemoveOpen(true);
      setCompanyOwnerToDelete(owner);
    }
  };

  const handleRemoveOpen = (isOpen: boolean) => () => setRemoveOpen(isOpen);
  const handleAddNewToggle = () => setAddNewToggled(!isAddNewToggled);

  return (
    <Wrapper>
      {areOwnersLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <>
          <ColumnWrapper>
            <Heading>Administratorzy</Heading>
            <AddNewButton text={'Dodaj nowego administratora'} callback={handleAddNewToggle} />
            {companyOwners.map((owner) => (
              <ListBox
                key={owner._id}
                name={`${owner.name} ${owner.lastName}`}
                topDescription={''}
                bottomDescription={owner.email}
                callback={listBoxCallback(owner)}
                isCompanyBox={false}
                isEmpty={true}
              />
            ))}
          </ColumnWrapper>
          <ColumnWrapper disabled={!isAddNewToggled}>
            <Heading>Wybierz administratora</Heading>
            {allCompanyEmployees.map((employee) => (
              <ListBox
                key={employee._id}
                name={`${employee.userId.name} ${employee.userId.name}`}
                topDescription={new Date(employee.userId.dateOfBirth).toLocaleDateString()}
                bottomDescription={employee.userId.email}
                callback={addCompanyOwner(employee.userId._id)}
                isCompanyBox={false}
                isEmpty={true}
              />
            ))}
          </ColumnWrapper>
        </>
      )}
      <RemoveAdminPopup isOpen={isRemoveOpen} closePopup={handleRemoveOpen(false)} companyOwnerToDelete={companyOwnerToDelete} />
    </Wrapper>
  );
};

export default AdminSettings;
