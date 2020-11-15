import React from 'react';
import TinyLineChart from '../TinyLineChart/TinyLineChart';
import { UserIcon } from '../../../styles/iconStyles';
import { Wrapper, RowWrapper, TitleParagraph, Value } from './InformationBox.styles';
import { tinyChartData } from '../../../utils/staticData';

interface Props {
  title: string;
  value: string | number;
  areaName: string;
  chartAnimationDelay?: number;
}

const InformationBox: React.FC<Props> = ({ title, value, areaName, chartAnimationDelay }) => {
  return (
    <Wrapper areaName={areaName}>
      <RowWrapper>
        <UserIcon />
        <TitleParagraph>{title}</TitleParagraph>
      </RowWrapper>
      <Value>{value}</Value>
      <TinyLineChart data={tinyChartData} animationDelay={chartAnimationDelay ? chartAnimationDelay : 0} />
    </Wrapper>
  );
};

export default InformationBox;
