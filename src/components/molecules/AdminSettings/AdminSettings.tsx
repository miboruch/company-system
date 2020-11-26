import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { bindActionCreators } from 'redux';
import AddNewButton from '../../atoms/AddNewButton/AddNewButton';
import Spinner from '../../atoms/Spinner/Spinner';
import ListBox from '../ListBox/ListBox';
import RemoveAdminPopup from '../RemoveAdminPopup/RemoveAdminPopup';
import { CompanyOwnersInterface } from '../../../types/modelsTypes';
import { AppState, useAppDispatch } from '../../../store/test-store';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { getAllCompanyEmployees } from '../../../ducks/employees/employees-data/employees-data-creators';
import { getCompanyOwners, addNewCompanyOwner } from '../../../ducks/company/company-owners/company-owners-creators';
import { SpinnerWrapper } from '../../../styles/shared';
import { NotificationTypes } from '../../../types/actionTypes/toggleAcitonTypes';
import { setNotificationMessage } from '../../../actions/toggleActions';
import { Wrapper, ColumnWrapper, Heading } from './AdminSettings.styles';

type ConnectedProps = LinkDispatchProps;

const AdminSettings: React.FC<ConnectedProps> = ({ setNotificationMessage }) => {
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

  const addCompanyOwner = (userId: string) => {
    dispatch(addNewCompanyOwner(userId));
  };

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
            <AddNewButton text={'Dodaj nowego administratora'} callback={() => setAddNewToggled(!isAddNewToggled)} />
            {companyOwners.map((owner) => (
              <ListBox
                key={owner._id}
                name={`${owner.name} ${owner.lastName}`}
                topDescription={''}
                bottomDescription={owner.email}
                callback={() => {
                  if (owner._id === userData?.userId) {
                    setNotificationMessage('Nie możesz usunąc samego siebie', NotificationTypes.Error);
                  } else {
                    setRemoveOpen(true);
                    setCompanyOwnerToDelete(owner);
                  }
                }}
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
                callback={() => addCompanyOwner(employee.userId._id)}
                isCompanyBox={false}
                isEmpty={true}
              />
            ))}
          </ColumnWrapper>
        </>
      )}
      <RemoveAdminPopup isOpen={isRemoveOpen} closePopup={() => setRemoveOpen(false)} companyOwnerToDelete={companyOwnerToDelete} />
    </Wrapper>
  );
};

interface LinkDispatchProps {
  setNotificationMessage: (message: string | null, notificationType: NotificationTypes | null) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    setNotificationMessage: bindActionCreators(setNotificationMessage, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(AdminSettings);
