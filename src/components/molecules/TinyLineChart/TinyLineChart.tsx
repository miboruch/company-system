import React from 'react';
import styled from 'styled-components';
import { Line, LineChart, ResponsiveContainer } from 'recharts';

const ResponsiveContainerWrapper = styled(ResponsiveContainer)`
  position: absolute;
  top: 60%;
  transform: translateY(-50%);
  right: 2rem;
`;

interface Props {
  data: Array<any>;
  animationDelay?: number;
}

const TinyLineChart: React.FC<Props> = ({ data, animationDelay }) => {
  return (
    <ResponsiveContainerWrapper width={'40%'} height={50}>
      <LineChart data={data}>
        <Line type='monotone' dataKey='pv' stroke='#2d2d2d' strokeWidth={1} animationBegin={animationDelay ? animationDelay : 0} />
      </LineChart>
    </ResponsiveContainerWrapper>
  );
};

export default TinyLineChart;
