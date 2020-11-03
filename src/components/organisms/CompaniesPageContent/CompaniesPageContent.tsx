import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CompanyInterface } from '../../../types/modelsTypes';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getUserCompanies, setAddCompanyOpen, setCompany } from '../../../actions/companyActions';
import { AddIcon, EmptyParagraph, SpinnerWrapper } from '../../../styles/shared';
import Spinner from '../../atoms/Spinner/Spinner';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { Table, Wrapper } from '../../../pages/CompaniesPage/CompaniesPage.styles';
import { AddWrapper, AddParagraph } from '../../../styles/shared';
import ListBox from '../../molecules/ListBox/ListBox';
import AddCompanyController from '../../compound/AddCompany/AddCompanyController';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type ConnectedProps = LinkStateProps & LinkDispatchProps & RouteComponentProps<any>;

const CompaniesPageContent: React.FC<ConnectedProps> = ({ history, userCompanies, getUserCompanies, isLoading, setAddCompanyOpen, setCompany }) => {
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
              <EmptyParagraph>Brak firm</EmptyParagraph>
            ) : (
              userCompanies.map((company) => (
                <ListBox
                  key={company._id}
                  name={company.name}
                  topDescription={company.nip}
                  bottomDescription={`${company.address}, ${company.city}`}
                  callback={() => setCompany(company, () => history.push('/admin/home'))}
                  // on callback push to /admin/home or /user/home based on current page
                  isCompanyBox={true}
                  isChecked={false}
                />
              ))
            )}
          </Table>
          <AddWrapper onClick={() => setAddCompanyOpen(true)}>
            <AddIcon />
            <AddParagraph>Dodaj firme</AddParagraph>
          </AddWrapper>
        </Wrapper>
      )}
      <AddCompanyController />
    </GridWrapper>
  );
};

interface LinkStateProps {
  isLoading: boolean;
  userCompanies: CompanyInterface[];
}

interface LinkDispatchProps {
  getUserCompanies: () => void;
  setAddCompanyOpen: (isOpen: boolean) => void;
  setCompany: (currentCompany: CompanyInterface | null, successCallback: () => void) => void;
}

const mapStateToProps = ({ companyReducer: { userCompanies, isLoading } }: AppState): LinkStateProps => {
  return { userCompanies, isLoading };
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
