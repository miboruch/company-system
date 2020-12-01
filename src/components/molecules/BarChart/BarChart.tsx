import React from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart as Chart, Bar, Area } from 'recharts';
import { ChartWrapper, StyledResponsiveContainer, RowWrapper, FlexRowWrapper, StyledParagraph } from '../Chart/Chart.styles';
import { chartButtons } from '../../../utils/staticData';

interface Props {
  data: Array<any> | null;
  xAxisDataKey: string;
  barDataKey: string;
  barDataName: string;
  setDaysBack: (days: number) => void;
  daysBack: number;
}

const BarChart: React.FC<Props> = ({ data, xAxisDataKey, barDataKey, barDataName, setDaysBack, daysBack }) => {
  return (
    <ChartWrapper>
      <RowWrapper>
        <h4>Wykonane zadania</h4>
        <FlexRowWrapper>
          {chartButtons.map(({ value, text }) => (
            <StyledParagraph key={text} isActive={daysBack === value} onClick={() => setDaysBack(value)}>
              {text}
            </StyledParagraph>
          ))}
        </FlexRowWrapper>
      </RowWrapper>
      <StyledResponsiveContainer width={'100%'} height={250}>
        <Chart data={data ? data : []} barSize={30}>
          <CartesianGrid strokeDasharray='2 2' />
          <XAxis dataKey={xAxisDataKey} stroke={'#aaa'} tick={{ fontSize: 12 }} />
          <YAxis stroke={'#aaa'} tick={{ fontSize: 12 }} />
          <Tooltip
            itemStyle={{
              color: '#2d2d2d',
              fontSize: '12px',
              fontWeight: '500'
            }}
          />
          <Legend iconSize={16} />
          <Bar dataKey={barDataKey} name={barDataName} fill='#2d2d2d' radius={[30, 30, 30, 30]} />
        </Chart>
      </StyledResponsiveContainer>
    </ChartWrapper>
  );
};

export default BarChart;
