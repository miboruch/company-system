import React from 'react';
import { ContentWrapper, Name, Subparagraph, Wrapper } from './CompanyBox.styles';
import ArrowButton from '../../atoms/ArrowButton/ArrowButton';

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
      <ArrowButton onClick={() => callback()} />
    </Wrapper>
  );
};

export default CompanyBox;
