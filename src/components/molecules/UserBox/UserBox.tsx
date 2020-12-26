import React from 'react';

import ArrowButton from '../../atoms/ArrowButton/ArrowButton';

import { Name, Subparagraph } from '../ListBox/ListBox.styles';
import { Wrapper, ContentWrapper } from './UserBox.styles';
import { EmptyIcon } from 'styles/iconStyles';

interface Props {
  name: string;
  topDescription: string | Date;
  bottomDescription: string;
  callback: () => void;
  isActive: boolean;
}

const UserBox: React.FC<Props> = ({ name, topDescription, bottomDescription, callback, isActive }) => {
  return (
    <Wrapper onClick={callback} isActive={isActive}>
      <ContentWrapper>
        <EmptyIcon />
        <div>
          <Subparagraph>{topDescription}</Subparagraph>
          <Name>{name}</Name>
          <Subparagraph>{bottomDescription}</Subparagraph>
        </div>
      </ContentWrapper>
      <ArrowButton />
    </Wrapper>
  );
};

export default UserBox;
