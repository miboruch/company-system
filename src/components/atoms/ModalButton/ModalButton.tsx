import React from 'react';
import { Button } from './ModalButton.styles';

export enum ButtonType {
  Cancel = 'cancel',
  Delete = 'delete',
  Add = 'add'
}

interface Props {
  onClick: () => void;
  buttonType: ButtonType;
  text: string;
}

const ModalButton: React.FC<Props> = ({ onClick, buttonType, text }) => {
  return (
    <Button type={'button'} onClick={() => onClick()} buttonType={buttonType}>
      {text}
    </Button>
  );
};

export default ModalButton;
