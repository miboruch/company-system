import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as User } from '../../../assets/icons/user.svg';
import { ReactComponent as Task } from '../../../assets/icons/list.svg';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const iconStyles = css`
  width: 20px;
  height: 20px;
  margin-right: 2rem;

  path {
    fill: ${({ theme }) => theme.colors.dark};
  }
`;

interface WrapperProps {
  areaName: string;
}

const Wrapper = styled.div<WrapperProps>`
  width: 46%;
  //height: 100%;
  height: 120px;
  align-self: center;
  border-radius: 30px;
  border: 1px solid #E6E6E6;
  padding: 2rem;
  position: relative;

  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    grid-area: '${({ areaName }) => areaName}';
    background-color: ${({ theme }) => theme.colors.menuBackground};
    border:none;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserIcon = styled(User)`
  ${iconStyles};
`;

const TaskIcon = styled(Task)`
  ${iconStyles};
`;

const TitleParagraph = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.descriptionGray};
`;

const Value = styled.h1`
  font-size: 36px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-top: 2rem;
`;

const ResponsiveContainerWrapper = styled(ResponsiveContainer)`
  position: absolute;
  top: 60%;
  transform: translateY(-50%);
  right: 2rem;
`;

interface Props {
  title: string;
  value: string | number;
  areaName: string;
}

const InformationBox: React.FC<Props> = ({ title, value, areaName }) => {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ];
  return (
    <Wrapper areaName={areaName}>
      <RowWrapper>
        <UserIcon />
        <TitleParagraph>{title}</TitleParagraph>
      </RowWrapper>
      <Value>{value}</Value>
      <ResponsiveContainerWrapper width={'40%'} height={50}>
        <LineChart data={data}>
          <Line type='monotone' dataKey='pv' stroke='#2d2d2d' strokeWidth={2} />
        </LineChart>
      </ResponsiveContainerWrapper>
    </Wrapper>
  );
};

export default InformationBox;
