import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';

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

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const FlexRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

interface SelectParagraph {
  isActive: boolean;
}

const Paragraph = styled.p<SelectParagraph>`
  font-size: 12px;
  margin-left: 2rem;
  color: ${({ isActive, theme }) => (isActive ? theme.colors.dark : theme.colors.textGray)};
  font-weight: ${({ theme }) => theme.font.weight.demi};
  transition: color 0.5s ease;
  cursor: pointer;
`;

export { ChartWrapper, StyledResponsiveContainer, RowWrapper, FlexRowWrapper, Paragraph };
