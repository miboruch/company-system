import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import GridWrapper from '../../components/templates/GridWrapper/GridWrapper';
import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import { Title } from '../../styles/sharedStyles';
import { AppState } from '../../reducers/rootReducer';
import { getAdminCompanies } from '../../utils/companyAPI';
import { SpinnerWrapper } from '../../styles/sharedStyles';
import Spinner from '../../components/atoms/Spinner/Spinner';
import { CompanyInterface } from '../../types/modelsTypes';
import CompanyBox from '../../components/molecules/CompanyBox/CompanyBox';
import { Table, AddCompanyWrapper } from './CompaniesPage.styles';

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

  console.log(companies);

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
              <p>Brak firm</p>
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
          <AddCompanyWrapper>
            <p>Dodaj firme</p>
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
