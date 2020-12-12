import React from 'react';

import { ButtonWrapper, InnerButton } from './CloseButton.styles';

interface Props {
  close: () => void;
}

const CloseButton: React.FC<Props> = ({ close }) => {
  return (
    <ButtonWrapper onClick={() => close()}>
      <InnerButton />
    </ButtonWrapper>
  );
};

export default CloseButton;
