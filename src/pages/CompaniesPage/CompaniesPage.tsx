import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import GridWrapper from '../../components/templates/GridWrapper/GridWrapper';
import styled from 'styled-components';
import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import { Title } from '../../styles/sharedStyles';
import { AppState } from '../../reducers/rootReducer';
import { getAdminCompanies } from '../../utils/companyAPI';
import { SpinnerWrapper } from '../../styles/sharedStyles';
import Spinner from '../../components/atoms/Spinner/Spinner';

type ConnectedProps = Props & LinkStateProps;

interface Props {}

const ContentWrapper = styled.section`
  width: 100%;
  padding: 0 2rem;
`;

const Table = styled.section`
  width: 98%;
  height: 80vh;
  border: 1px solid ${({ theme }) => theme.colors.impactGray};
  border-radius: 30px;
  margin-top: 2rem;

  ${({ theme }) => theme.mq.hdReady} {
    grid-area: content;
    width: 90%;
    margin-top: 0;
    border-radius: 15px;
  }
`;

const AddCompanyWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
`;

const CompaniesPage: React.FC<ConnectedProps> = ({ token }) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [companies, setCompanies] = useState<[]>([]);

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
          <Table></Table>
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