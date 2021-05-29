import styled from 'styled-components';

const BudgetWrapper = styled.section`
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  overflow-x: scroll;
  flex-direction: row;

  ${({ theme }) => theme.mq.hdReady} {
    grid-area: budget;
  }
`;

export { BudgetWrapper };
