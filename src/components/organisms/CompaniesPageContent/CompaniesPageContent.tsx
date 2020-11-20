import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CompanyInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getUserCompanies, setAddCompanyOpen, setCompany } from '../../../actions/companyActions';
import { AddIcon, AddWrapper, SpinnerWrapper } from '../../../styles/shared';
import Spinner from '../../atoms/Spinner/Spinner';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { Table, Wrapper } from '../../../pages/CompaniesPage/CompaniesPage.styles';
import { Paragraph } from '../../../styles/typography/typography';
import ListBox from '../../molecules/ListBox/ListBox';
import AddCompanyController from '../../compound/AddCompany/AddCompanyController';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { UserRole } from '../../../types/actionTypes/authenticationActionTypes';

type ConnectedProps = LinkStateProps & LinkDispatchProps & RouteComponentProps<any>;

const CompaniesPageContent: React.FC<ConnectedProps> = ({ history, role, userCompanies, getUserCompanies, isLoading, setAddCompanyOpen, setCompany }) => {
  useEffect(() => {
    getUserCompanies();
  }, []);

  return (
    <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Twoje firmy'}>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <Wrapper>
          <Table isEmpty={userCompanies.length === 0}>
            {userCompanies.length === 0 ? (
              <Paragraph type={'empty'}>Brak firm</Paragraph>
            ) : (
              userCompanies.map((company) => (
                <ListBox
                  key={company._id}
                  name={company.name}
                  topDescription={company.nip}
                  bottomDescription={`${company.address}, ${company.city}`}
                  callback={() => setCompany(company, () => history.push(role === UserRole.Admin ? '/admin/home' : '/user/home'))}
                  // on callback push to /admin/home or /user/home based on current page
                  isCompanyBox={true}
                  isChecked={false}
                />
              ))
            )}
          </Table>
          <AddWrapper onClick={() => setAddCompanyOpen(true)}>
            <AddIcon />
            <Paragraph type={'add'}>Dodaj firme</Paragraph>
          </AddWrapper>
        </Wrapper>
      )}
      <AddCompanyController />
    </GridWrapper>
  );
};

interface LinkStateProps {
  role: UserRole;
  isLoading: boolean;
  userCompanies: CompanyInterface[];
}

interface LinkDispatchProps {
  getUserCompanies: () => void;
  setAddCompanyOpen: (isOpen: boolean) => void;
  setCompany: (currentCompany: CompanyInterface | null, successCallback: () => void) => void;
}

const mapStateToProps = ({ companyReducer: { userCompanies, isLoading }, authenticationReducer: { role } }: AppState): LinkStateProps => {
  return { userCompanies, isLoading, role };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getUserCompanies: bindActionCreators(getUserCompanies, dispatch),
    setAddCompanyOpen: bindActionCreators(setAddCompanyOpen, dispatch),
    setCompany: bindActionCreators(setCompany, dispatch)
  };
};

const CompaniesPageContentWithRouter = withRouter(CompaniesPageContent);

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesPageContentWithRouter);
