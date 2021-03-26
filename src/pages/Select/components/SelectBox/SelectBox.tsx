import React from 'react';

import { ArrowButton } from 'components';
import { Direction } from 'types/globalTypes';

import { ArrowWrapper, ContentBox, Paragraph, StyledHeading } from './SelectBox.styles';

interface Props {
  onClick: () => void;
  heading: string;
  text: string;
}

const SelectBox: React.FC<Props> = ({ onClick, heading, text }) => {
  return (
    <ContentBox onClick={onClick}>
      <div>
        <StyledHeading>{heading}</StyledHeading>
        <Paragraph>{text}</Paragraph>
      </div>
      <ArrowWrapper>
        <ArrowButton direction={Direction.Right} />
      </ArrowWrapper>
    </ContentBox>
  );
};

export default SelectBox;
