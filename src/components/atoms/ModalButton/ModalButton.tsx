import React from 'react';

import { Button } from './ModalButton.styles';

export enum ButtonType {
  Cancel = 'cancel',
  Delete = 'delete',
  Add = 'add',
  Submit = 'submit'
}

interface Props {
  onClick?: () => void;
  buttonType: ButtonType;
  text: string;
  submit?: boolean;
}

const ModalButton: React.FC<Props> = ({ onClick, submit, buttonType, text }) => {
  return (
    <Button type={submit ? 'submit' : 'button'} onClick={() => !!onClick && onClick()} buttonType={buttonType}>
      {text}
    </Button>
  );
};

export default ModalButton;
