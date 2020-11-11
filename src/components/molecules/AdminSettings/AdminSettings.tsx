import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import AddNewButton from '../../atoms/AddNewButton/AddNewButton';
import { CompanyOwnersInterface, EmployeeDataInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getAllCompanyEmployees } from '../../../actions/employeeActions';
import { addNewCompanyOwner, getCompanyOwners } from '../../../actions/companyActions';
import Spinner from '../../atoms/Spinner/Spinner';
import ListBox from '../ListBox/ListBox';
import { SpinnerWrapper } from '../../../styles/shared';
import RemoveAdminPopup from '../RemoveAdminPopup/RemoveAdminPopup';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

interface ColumnWrapperInterface {
  disabled?: boolean;
}

const ColumnWrapper = styled.div<ColumnWrapperInterface>`
  width: 50%;
  height: 100%;
  padding: 3rem;
  opacity: ${({ disabled }) => (disabled ? 0 : 1)};
  visibility: ${({ disabled }) => (disabled ? 'hidden' : 'visible')};
  transition: opacity 0.5s ease, visibility 0.5s ease;
`;

const Heading = styled.h2`
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-bottom: 2rem;
  margin-left: 2rem;
`;

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const AdminSettings: React.FC<ConnectedProps> = ({ allCompanyEmployees, getAllCompanyEmployees, getCompanyOwners, addNewCompanyOwner }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isAddNewToggled, setAddNewToggled] = useState<boolean>(false);
  const [isRemoveOpen, setRemoveOpen] = useState<boolean>(false);
  const [companyOwners, setCompanyOwners] = useState<CompanyOwnersInterface[]>([]);
  useEffect(() => {
    allCompanyEmployees.length === 0 && getAllCompanyEmployees();
    getCompanyOwners(setCompanyOwners, setLoading);
  }, []);

  const addCompanyOwner = (userId: string) => {
    addNewCompanyOwner(userId, async () => getCompanyOwners(setCompanyOwners, setLoading));
  };

  return (
    <Wrapper>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <>
          <ColumnWrapper>
            <Heading>Administratorzy</Heading>
            <AddNewButton text={'Dodaj nowego administratora'} callback={() => setAddNewToggled(!isAddNewToggled)} />
            {companyOwners.map((owner) => (
              <ListBox name={`${owner.name} ${owner.lastName}`} topDescription={''} bottomDescription={owner.email} callback={() => setRemoveOpen(true)} isCompanyBox={false} isEmpty={true} />
            ))}
          </ColumnWrapper>
          <ColumnWrapper disabled={!isAddNewToggled}>
            <Heading>Wybierz administratora</Heading>
            {allCompanyEmployees.map((employee) => (
              <ListBox
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
      <RemoveAdminPopup isOpen={isRemoveOpen} setOpen={setRemoveOpen} />
    </Wrapper>
  );
};

interface LinkStateProps {
  allCompanyEmployees: EmployeeDataInterface[];
}

interface LinkDispatchProps {
  getAllCompanyEmployees: () => void;
  getCompanyOwners: (setCompanyOwners: (owners: CompanyOwnersInterface[]) => void, setLoading: (isLoading: boolean) => void) => void;
  addNewCompanyOwner: (userId: string, callback: () => void) => void;
}

const mapStateToProps = ({ employeeReducer: { allCompanyEmployees } }: AppState): LinkStateProps => {
  return { allCompanyEmployees };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getAllCompanyEmployees: bindActionCreators(getAllCompanyEmployees, dispatch),
    getCompanyOwners: bindActionCreators(getCompanyOwners, dispatch),
    addNewCompanyOwner: bindActionCreators(addNewCompanyOwner, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminSettings);
