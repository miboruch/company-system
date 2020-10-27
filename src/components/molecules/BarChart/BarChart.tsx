import React from 'react';
import { BarChart as Chart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { ChartWrapper, StyledResponsiveContainer } from './BarChart.styles';

interface Props {
  data: Array<any> | null;
  xAxisDataKey: string;
  barDataKey: string;
  secondBarDataKey?: string;
  secondBarDataName?: string;
  barDataName: string;
  setDaysBack?: (days: number) => void;
}

const BarChart: React.FC<Props> = ({ data, xAxisDataKey, barDataKey, secondBarDataKey, secondBarDataName, barDataName, setDaysBack }) => {
  return (
    <ChartWrapper>
      <p onClick={() => setDaysBack && setDaysBack(1)}>1 day</p>
      <p onClick={() => setDaysBack && setDaysBack(7)}>7 days</p>
      <p onClick={() => setDaysBack && setDaysBack(30)}>30 days</p>
      <p onClick={() => setDaysBack && setDaysBack(365)}>365 days</p>
      <StyledResponsiveContainer width={'100%'} height={250}>
        <Chart data={!!data ? data : []} barSize={30}>
          <defs>
            <linearGradient id='chartColor' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={'#2d2d2d'} stopOpacity={1} />
              <stop offset='50%' stopColor={'#85BE9B'} stopOpacity={1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='2 2' />
          <XAxis dataKey={xAxisDataKey} stroke={'#aaa'} tick={{ fontSize: 12 }} />
          <YAxis stroke={'#aaa'} tick={{ fontSize: 12 }} />
          <Tooltip
            cursor={false}
            itemStyle={{
              color: '#2d2d2d',
              fontSize: '12px',
              fontWeight: '500'
            }}
          />
          <Legend iconSize={16} />
          <Bar dataKey={barDataKey} name={barDataName} fill={'url(#chartColor)'} radius={[30, 30, 30, 30]} />
          {secondBarDataKey && secondBarDataName && <Bar dataKey={secondBarDataKey} name={secondBarDataName} fill={'yellow'} radius={[30, 30, 30, 30]} />}
          {/*#2d2d2d*/}
        </Chart>
      </StyledResponsiveContainer>
    </ChartWrapper>
  );
};

export default BarChart;
