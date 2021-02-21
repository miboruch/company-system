import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ListBox, Spinner, GridWrapper } from 'components';
import AddCompanyController from '../AddCompany/AddCompanyController';
import { useFetch, useShowContent } from 'components/hooks';

import { fetchAdminCompanies, fetchEmployeeCompanies } from 'api/company/api.company';
import { setCurrentCompany } from 'ducks/company/current-company/current-company-creators';
import { setAddCompanyOpen } from 'ducks/company/company-toggle/company-toggle';
import { CompanyInterface } from 'types/modelsTypes';
import { AppState, useAppDispatch } from 'store/store';
import { UserRole } from 'ducks/auth/roles/roles';

import { AddIcon, AddWrapper, SpinnerWrapper } from 'styles/shared';
import { Table, Wrapper } from 'pages/Companies/Companies.styles';
import { Paragraph } from 'styles/typography/typography';

const CompaniesContent: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { role } = useSelector((state: AppState) => state.auth.roles);
  const token = localStorage.getItem('token');

  const companiesData =
    role === UserRole.Admin
      ? useFetch<typeof fetchAdminCompanies>(fetchAdminCompanies(token))
      : useFetch<typeof fetchEmployeeCompanies>(fetchEmployeeCompanies(token));
  const { showContent, showLoader, showNoContent } = useShowContent(companiesData);
  const { payload } = companiesData;

  const handleAddCompanyOpen = () => dispatch(setAddCompanyOpen(true));

  const handleCompanyClick = (company: CompanyInterface) => () =>
    dispatch(
      setCurrentCompany(company, () =>
        history.push(role === UserRole.Admin ? `/admin/home/${company._id}` : `/user/home/${company._id}`)
      )
    );

  return (
    <GridWrapper mobilePadding={true} onlyHeader={true} pageName={'Twoje firmy'}>
      {showLoader ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <Wrapper>
          <Table isEmpty={showNoContent}>
            {showNoContent && <Paragraph type={'empty'}>Brak firm</Paragraph>}
            {showContent &&
              payload &&
              payload.map((company) => (
                <ListBox
                  key={company._id}
                  name={company.name}
                  topDescription={company.nip}
                  bottomDescription={`${company.address}, ${company.city}`}
                  callback={handleCompanyClick(company)}
                  isCompanyBox={true}
                  isChecked={false}
                />
              ))}
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

export default CompaniesContent;
