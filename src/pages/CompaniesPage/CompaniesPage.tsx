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

type ConnectedProps = Props & LinkStateProps;

interface Props {}

const CompaniesPage: React.FC<ConnectedProps> = ({ token }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
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
        <GridWrapper onlyHeader={true}>
          <Title>Twoje firmy</Title>
          <Table isEmpty={companies.length === 0}>
            {companies.length === 0 ? (
              <EmptyParagraph>Brak firm</EmptyParagraph>
            ) : (
              companies.map((company) => (
                <CompanyBox
                  key={company._id}
                  name={company.name}
                  nip={company.nip}
                  address={`${company.address}, ${company.city}`}
                  callback={() => console.log('set currentCompany and redirect')}
                />
              ))
            )}
          </Table>
          <AddCompanyWrapper onClick={() => console.log('open add company component')}>
            <AddIcon />
            <AddCompanyParagraph>Dodaj firme</AddCompanyParagraph>
          </AddCompanyWrapper>
        </GridWrapper>
      )}
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
