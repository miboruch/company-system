import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AddNewButton from '../../atoms/AddNewButton/AddNewButton';
import Spinner from '../../atoms/Spinner/Spinner';
import ListBox from '../ListBox/ListBox';
import RemoveAdminPopup from '../RemoveAdminPopup/RemoveAdminPopup';

import { CompanyOwnersInterface } from 'types/modelsTypes';
import { AppState, useAppDispatch } from 'store/store';
import { NotificationTypes } from 'types/globalTypes';
import { setNotificationMessage } from 'ducks/popup/popup';
import { getAllCompanyEmployees } from 'ducks/employees/employees-data/employees-data-creators';
import { getCompanyOwners, addNewCompanyOwner } from 'ducks/company/company-owners/company-owners-creators';
import { SpinnerWrapper } from 'styles/shared';
import { Wrapper, ColumnWrapper, Heading } from './AdminSettings.styles';

const AdminSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allCompanyEmployees } = useSelector((state: AppState) => state.employees.employeesData);

  const { userData } = useSelector((state: AppState) => state.auth.data);
  const { areOwnersLoading, companyOwners } = useSelector((state: AppState) => state.company.companyOwners);

  const [isAddNewToggled, setAddNewToggled] = useState<boolean>(false);
  const [isRemoveOpen, setRemoveOpen] = useState<boolean>(false);
  const [companyOwnerToDelete, setCompanyOwnerToDelete] = useState<CompanyOwnersInterface | null>(null);

  useEffect(() => {
    allCompanyEmployees.length === 0 && dispatch(getAllCompanyEmployees());
    dispatch(getCompanyOwners());
  }, []);

  const addCompanyOwner = (userId: string) => () => {
    dispatch(addNewCompanyOwner(userId));
  };

  const listBoxCallback = (owner: CompanyOwnersInterface) => () => {
    if (owner._id === userData?.userId) {
      dispatch(setNotificationMessage({ message: 'Nie możesz usunąc samego siebie', notificationType: NotificationTypes.Error }));
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
