import React from 'react';
import { BarChart as Chart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { ChartWrapper } from './BarChart.styles';

interface Props {
  data: Array<any> | null;
  xAxisDataKey: string;
  barDataKey: string;
  barDataName: string;
}

const BarChart: React.FC<Props> = ({ data, xAxisDataKey, barDataKey, barDataName }) => {
  return (
    <ChartWrapper>
      <ResponsiveContainer width={560} height={250}>
        <Chart data={!!data ? data : []} barSize={30}>
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
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default BarChart;
