import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Spinner from 'components/atoms/Spinner/Spinner';
import GridWrapper from 'components/templates/GridWrapper/GridWrapper';
import ListBox from 'components/molecules/ListBox/ListBox';
import AddCompanyController from 'components/compound/AddCompany/AddCompanyController';

import { AppState, useAppDispatch } from 'store/store';
import { UserRole } from 'ducks/auth/roles/roles';
import { setCurrentCompany } from 'ducks/company/current-company/current-company-creators';
import { setAddCompanyOpen } from 'ducks/company/company-toggle/company-toggle';
import { getUserCompanies } from 'ducks/company/companies/companies-creators';
import { AddIcon, AddWrapper, SpinnerWrapper } from 'styles/shared';
import { Table, Wrapper } from 'pages/CompaniesPage/CompaniesPage.styles';
import { Paragraph } from 'styles/typography/typography';
import { CompanyInterface } from 'types/modelsTypes';

const CompaniesPageContent: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const dispatch = useAppDispatch();
  const { areUserCompaniesLoading, userCompanies } = useSelector((state: AppState) => state.company.companies);
  const { role } = useSelector((state: AppState) => state.auth.roles);

  const listBoxCallback = (company: CompanyInterface) => () => dispatch(setCurrentCompany(company, () => history.push(role === UserRole.Admin ? '/admin/home' : '/user/home')));

  const handleAddCompanyOpen = () => dispatch(setAddCompanyOpen(true));

  useEffect(() => {
    dispatch(getUserCompanies());
  }, []);

  return (
    <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Twoje firmy'}>
      {areUserCompaniesLoading ? (
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
                  callback={listBoxCallback(company)}
                  isCompanyBox={true}
                  isChecked={false}
                />
              ))
            )}
          </Table>
          <AddWrapper onClick={handleAddCompanyOpen}>
            <AddIcon />
            <Paragraph type={'add'}>Dodaj firme</Paragraph>
          </AddWrapper>
        </Wrapper>
      )}
      <AddCompanyController />
    </GridWrapper>
  );
};

export default withRouter(CompaniesPageContent);
