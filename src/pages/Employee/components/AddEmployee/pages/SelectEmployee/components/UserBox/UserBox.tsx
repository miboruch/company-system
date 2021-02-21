import React from 'react';

import { ArrowButton } from 'components';
import { Name, Subparagraph } from 'components/ui/ListBox/ListBox.styles';
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
