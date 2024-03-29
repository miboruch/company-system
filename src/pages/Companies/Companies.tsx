import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import AddCompanyController from './components/AddCompany/AddCompanyController';
import { GridWrapper, ListBox, Spinner, MenuTemplate } from 'components';
import { useFetch, useShowContent } from 'components/hooks';
import { fetchUserCompanies } from 'api';
import { setCurrentCompany } from 'ducks/company/current-company/current-company-creators';
import { useAppDispatch } from 'store/store';
import { CompanyModel } from 'types';

import { AddIcon, AddWrapper, Paragraph, SpinnerWrapper } from 'styles';
import { Table, Wrapper } from 'pages/Companies/Companies.styles';

const Companies: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [isAddCompanyOpen, setAddCompanyOpen] = useState<boolean>(false);
  const [refreshDate, setRefreshDate] = useState<Date>(new Date());

  const companiesData = useFetch(fetchUserCompanies, { dependencies: [refreshDate] });
  const { showContent, showLoader, showNoContent } = useShowContent(companiesData);
  const { payload } = companiesData;

  const handleAddCompanyOpen = (isOpen: boolean) => () => setAddCompanyOpen(isOpen);

  const handleCompanyClick = (company: CompanyModel) => () =>
    dispatch(setCurrentCompany(company, () => history.push(`/company/${company._id}/home`)));

  return (
    <MenuTemplate>
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
                payload?.map(({ companyId: company }) => (
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
            <AddWrapper onClick={handleAddCompanyOpen(true)}>
              <AddIcon />
              <Paragraph type={'add'}>Dodaj firme</Paragraph>
            </AddWrapper>
          </Wrapper>
        )}
        <AddCompanyController
          isOpen={isAddCompanyOpen}
          handleClose={handleAddCompanyOpen(false)}
          setRefreshDate={setRefreshDate}
        />
      </GridWrapper>
    </MenuTemplate>
  );
};
export default Companies;
