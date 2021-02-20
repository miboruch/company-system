import React from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, AreaChart, Area } from 'recharts';

import { ChartWrapper, StyledResponsiveContainer, RowWrapper, FlexRowWrapper, StyledParagraph } from 'styles';
import { chartButtons } from 'utils/staticData';

interface Props {
  data: Array<any> | null;
  xAxisDataKey: string;
  barDataKey: string;
  secondBarDataKey?: string;
  secondBarDataName?: string;
  barDataName: string;
  setDaysBack?: (days: number) => void;
  daysBack: number;
}

const Chart: React.FC<Props> = ({
  data,
  xAxisDataKey,
  barDataKey,
  secondBarDataKey,
  secondBarDataName,
  barDataName,
  setDaysBack,
  daysBack
}) => {
  return (
    <ChartWrapper>
      <RowWrapper>
        <h4>Finanse</h4>
        {!!setDaysBack && (
          <FlexRowWrapper>
            {chartButtons.map(({ value, text }) => (
              <StyledParagraph key={text} isActive={daysBack === value} onClick={() => setDaysBack(value)}>
                {text}
              </StyledParagraph>
            ))}
          </FlexRowWrapper>
        )}
      </RowWrapper>
      <StyledResponsiveContainer width={'100%'} height={250}>
        <AreaChart data={data ? data : []}>
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
          <Area type={'monotone'} dataKey={barDataKey} name={barDataName} fill={'url(#incomeColor)'} />
          {secondBarDataKey && secondBarDataName && (
            <Area type={'monotone'} dataKey={secondBarDataKey} name={secondBarDataName} fill={'url(#expenseColor)'} />
          )}
        </AreaChart>
      </StyledResponsiveContainer>
    </ChartWrapper>
  );
};

export default Chart;
