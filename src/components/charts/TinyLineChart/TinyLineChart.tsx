import React from 'react';
import { Line, LineChart } from 'recharts';

import { ResponsiveContainerWrapper } from './TinyLineChart.styles';

interface Props {
  data: Array<any>;
  animationDelay?: number;
}

const TinyLineChart: React.FC<Props> = ({ data, animationDelay }) => {
  return (
    <ResponsiveContainerWrapper width={'40%'} height={50}>
      <LineChart data={data}>
        <Line
          type='monotone'
          dataKey='pv'
          stroke='#2d2d2d'
          strokeWidth={1}
          animationBegin={animationDelay ? animationDelay : 0}
        />
      </LineChart>
    </ResponsiveContainerWrapper>
  );
};

export default TinyLineChart;
