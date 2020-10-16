import React from 'react';
import { Wrapper, Name, Subparagraph } from './CompanyBox.styles';

interface Props {
  name: string;
  nip: string;
  address: string;
  callback: () => void;
}

const CompanyBox: React.FC<Props> = ({ name, nip, address, callback }) => {
  return (
    <Wrapper onClick={() => callback()}>
      <Subparagraph>{nip}</Subparagraph>
      <Name>{name}</Name>
      <Subparagraph>{address}</Subparagraph>
    </Wrapper>
  );
};

export default CompanyBox;
