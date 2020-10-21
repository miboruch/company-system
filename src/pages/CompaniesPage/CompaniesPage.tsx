import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import GridWrapper from '../../components/templates/GridWrapper/GridWrapper';
import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import { getAdminCompanies } from '../../utils/companyAPI';
import Spinner from '../../components/atoms/Spinner/Spinner';
import CompanyBox from '../../components/molecules/CompanyBox/CompanyBox';
import { CompanyInterface } from '../../types/modelsTypes';
import { AppState } from '../../reducers/rootReducer';
import { SpinnerWrapper, EmptyParagraph, AddIcon, Title } from '../../styles/sharedStyles';
import { Table, AddCompanyWrapper, AddCompanyParagraph } from './CompaniesPage.styles';
import AddCompanyController from '../../components/compound/AddCompany/AddCompanyController';
import ListBox from '../../components/molecules/ListBox/ListBox';
import { Header } from '../../components/organisms/LandingPageContent/LandingPageContent.styles';

type ConnectedProps = Props & LinkStateProps;

interface Props {}

const CompaniesPage: React.FC<ConnectedProps> = ({ token }) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isAddCompanyOpen, setAddCompanyOpen] = useState<boolean>(false);
  const [companies, setCompanies] = useState<Array<CompanyInterface>>([]);

  useEffect(() => {
    (async () => {
      token && (await getAdminCompanies(setLoading, setCompanies, token));
    })();
  }, [token]);

  return (
    <MenuTemplate>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <GridWrapper mobilePadding={true} onlyHeader={true}>
          <Title>Twoje firmy</Title>
          <Header />
          <Table isEmpty={companies.length === 0}>
            {companies.length === 0 ? (
              <EmptyParagraph>Brak firm</EmptyParagraph>
            ) : (
              companies.map((company) => (
                <ListBox
                  key={company._id}
                  name={company.name}
                  topDescription={company.nip}
                  bottomDescription={`${company.address}, ${company.city}`}
                  callback={() => console.log('set currentCompany and redirect')}
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
        </GridWrapper>
      )}
      <AddCompanyController isOpen={isAddCompanyOpen} setOpen={setAddCompanyOpen} />
    </MenuTemplate>
  );
};

interface LinkStateProps {
  token: string | null;
}

const mapStateToProps = ({ authenticationReducer: { token } }: AppState): LinkStateProps => {
  return { token };
};

export default connect(mapStateToProps)(CompaniesPage);
