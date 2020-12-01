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
        <Chart data={data ? data : []}>
          <defs>
            <linearGradient id='incomeColor' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='65%' stopColor={'#85BE9B'} stopOpacity={1} />
              <stop offset='90%' stopColor={'#fff'} stopOpacity={1} />
            </linearGradient>
            <linearGradient id='expenseColor' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='65%' stopColor={'#FE7070'} stopOpacity={1} />
              <stop offset='90%' stopColor={'#fff'} stopOpacity={1} />
            </linearGradient>
          </defs>
          <XAxis dataKey={xAxisDataKey} />
          <YAxis tick={{ fontSize: 12 }} />
          <CartesianGrid strokeDasharray='2 2' />
          <Tooltip
            cursor={false}
            itemStyle={{
              color: '#2d2d2d',
              fontSize: '12px',
              fontWeight: '500'
            }}
          />
          <Legend iconSize={16} />
          <Bar dataKey={barDataKey} name={barDataName} />
        </Chart>
      </StyledResponsiveContainer>
    </ChartWrapper>
  );
};

export default BarChart;
