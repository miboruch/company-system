import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import GridWrapper from '../../components/templates/GridWrapper/GridWrapper';
import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import Spinner from '../../components/atoms/Spinner/Spinner';
import { CompanyInterface } from '../../types/modelsTypes';
import { AppState } from '../../reducers/rootReducer';
import { SpinnerWrapper, EmptyParagraph, AddIcon, Title } from '../../styles/sharedStyles';
import { Table, AddCompanyWrapper, AddCompanyParagraph, Wrapper } from './CompaniesPage.styles';
import AddCompanyController from '../../components/compound/AddCompany/AddCompanyController';
import ListBox from '../../components/molecules/ListBox/ListBox';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getUserAdminCompanies, setAddCompanyOpen, setCompany } from '../../actions/companyActions';

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const CompaniesPage: React.FC<ConnectedProps> = ({ userCompanies, getUserAdminCompanies, isLoading, setAddCompanyOpen, setCompany }) => {
  useEffect(() => {
    getUserAdminCompanies();
  }, []);

  return (
    <MenuTemplate>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Twoje firmy'}>
          <Wrapper>
            <Table isEmpty={userCompanies.length === 0}>
              {userCompanies.length === 0 ? (
                <EmptyParagraph>Brak firm</EmptyParagraph>
              ) : (
                userCompanies.map((company) => (
                  <ListBox
                    key={company._id}
                    name={company.name}
                    topDescription={company.nip}
                    bottomDescription={`${company.address}, ${company.city}`}
                    callback={() => setCompany(company, () => console.log('company set'))}
                    isCompanyBox={true}
                    isChecked={false}
                  />
                ))
              )}
            </Table>
            <AddCompanyWrapper onClick={() => setAddCompanyOpen(true)}>
              <AddIcon />
              <AddCompanyParagraph>Dodaj firme</AddCompanyParagraph>
            </AddCompanyWrapper>
          </Wrapper>
        </GridWrapper>
      )}
      <AddCompanyController />
    </MenuTemplate>
  );
};

interface LinkStateProps {
  isLoading: boolean;
  userCompanies: CompanyInterface[];
}

interface LinkDispatchProps {
  getUserAdminCompanies: () => void;
  setAddCompanyOpen: (isOpen: boolean) => void;
  setCompany: (currentCompany: CompanyInterface | null, successCallback: () => void) => void;
}

const mapStateToProps = ({ companyReducer: { userCompanies, isLoading } }: AppState): LinkStateProps => {
  return { userCompanies, isLoading };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getUserAdminCompanies: bindActionCreators(getUserAdminCompanies, dispatch),
    setAddCompanyOpen: bindActionCreators(setAddCompanyOpen, dispatch),
    setCompany: bindActionCreators(setCompany, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesPage);
