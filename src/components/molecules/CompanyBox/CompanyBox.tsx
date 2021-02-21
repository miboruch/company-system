import React from 'react';

import { ArrowButton } from 'components';

import { ContentWrapper, Name, Subparagraph, Wrapper } from './CompanyBox.styles';

interface Props {
  name: string;
  nip: string;
  address: string;
  callback: () => void;
}

const CompanyBox: React.FC<Props> = ({ name, nip, address, callback }) => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Subparagraph>{nip}</Subparagraph>
        <Name>{name}</Name>
        <Subparagraph>{address}</Subparagraph>
      </ContentWrapper>
      <ArrowButton onClick={callback} />
    </Wrapper>
  );
};

export default CompanyBox;
