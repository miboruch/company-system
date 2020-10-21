import styled from 'styled-components';
import {ResponsiveContainer} from 'recharts';

const ChartWrapper = styled.div`
  width: 100%;
  overflow-x: scroll;
  margin-top: 3rem;
  //background-color: #fff;

  ${({ theme }) => theme.mq.hdReady} {
    grid-area: chart;
  }
`;

const StyledResponsiveContainer = styled(ResponsiveContainer)`
  width: 200%;
  
  ${({ theme }) => theme.mq.standard} {
    padding-left: 0;
  }
`;

export { ChartWrapper, StyledResponsiveContainer };
