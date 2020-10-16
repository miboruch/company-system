import React from 'react';
import { ButtonWrapper, InnerButton } from './CloseButton.styles';

interface Props {
  setBoxState: (isOpen: boolean) => void;
}

const CloseButton: React.FC<Props> = ({ setBoxState }) => {
  return (
    <ButtonWrapper onClick={() => setBoxState(false)}>
      <InnerButton />
    </ButtonWrapper>
  );
};

export default CloseButton;
