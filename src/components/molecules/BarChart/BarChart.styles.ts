import styled from 'styled-components';

const ChartWrapper = styled.div`
  width: 100%;
  overflow-x: scroll;
  margin-top: 3rem;

  ${({ theme }) => theme.mq.hdReady} {
    grid-area: chart;
  }
`;

export { ChartWrapper };
