import React from 'react';

import { Wrapper, Name, Subtext, StyledValue } from './HistoryItem.styles';

interface Props {
  name: string;
  description: string;
  date: string;
  value: string | number;
}

const HistoryItem: React.FC<Props> = ({ name, description, date, value }) => {
  const displayDate = new Date(date).toLocaleDateString();
  return (
    <Wrapper>
      <Name>{name}</Name>
      <Subtext>{description}</Subtext>
      <Subtext>{displayDate}</Subtext>
      <StyledValue>{value}</StyledValue>
    </Wrapper>
  );
};

export default HistoryItem;
