import React from 'react';
import GridWrapper from '../../components/templates/GridWrapper/GridWrapper';
import styled from 'styled-components';
import MenuTemplate from '../../components/templates/MenuTemplate/MenuTemplate';
import { Title } from '../../styles/sharedStyles';

interface Props {}

const ContentWrapper = styled.section`
  width: 100%;
  padding: 0 2rem;
`;

const CompaniesPage: React.FC<Props> = () => {
  return (
    <MenuTemplate>
      <GridWrapper onlyHeader={true}>
        <Title>Twoje firmy</Title>
      </GridWrapper>
    </MenuTemplate>
  );
};

export default CompaniesPage;
