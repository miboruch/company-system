import React from 'react';
import PopupTemplate from '../../templates/PopupTemplate/PopupTemplate';
import ModalButton, { ButtonType } from '../../atoms/ModalButton/ModalButton';
import { ButtonWrapper } from '../../../styles/popupStyles';

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const RemoveAdminPopup: React.FC<Props> = ({ isOpen, setOpen }) => {
  return (
    <PopupTemplate isOpen={isOpen} headerText={'Usuń administratora'}>
      <p>Test</p>
      <ButtonWrapper>
        <ModalButton onClick={() => setOpen(false)} buttonType={ButtonType.Cancel} text={'Zamknij'} />
        <ModalButton submit={true} buttonType={ButtonType.Add} text={'Akceptuj'} />
      </ButtonWrapper>
    </PopupTemplate>
  );
};

export default RemoveAdminPopup;
