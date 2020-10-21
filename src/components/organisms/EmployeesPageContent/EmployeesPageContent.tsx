import React from 'react';
import styled from 'styled-components';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { Title } from '../../../styles/sharedStyles';
import { Header } from '../LandingPageContent/LandingPageContent.styles';

const List = styled.div`
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.mq.hdReady} {
    grid-area: list;
  }
`;

interface Props {}

const EmployeesPageContent: React.FC<Props> = () => {
  return (
    <GridWrapper>
      <Title>Pracownicy</Title>
      <Header />
      <List>
        <p>hello</p>
        <p>yo</p>
      </List>
    </GridWrapper>
  );
};

export default EmployeesPageContent;
