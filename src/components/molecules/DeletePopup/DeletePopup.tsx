import React from 'react';

import ModalButton, { ButtonType } from '../../atoms/ModalButton/ModalButton';
import PopupTemplate from '../../templates/PopupTemplate/PopupTemplate';

import { Paragraph } from 'styles/typography/typography';
import { ContentWrapper, ButtonWrapper } from 'styles/popupStyles';

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  headerText: string;
  text: string;
  callback: () => void;
}

const DeletePopup: React.FC<Props> = ({ isOpen, setOpen, headerText, text, callback }) => {
  const handleModalClick = () => {
    setOpen(false);
    callback();
  };

  const handleClose = () => setOpen(false);

  return (
    <PopupTemplate isOpen={isOpen} headerText={headerText}>
      <ContentWrapper>
        <Paragraph type={'text'}>
          Czy jesteś pewnien, że chcesz usunąć <strong>{text}</strong>?
        </Paragraph>
        <Paragraph type={'info'}>W razie pomyłki nie będzie możliwości cofnięcia tej akcji</Paragraph>
      </ContentWrapper>
      <ButtonWrapper>
        <ModalButton onClick={handleClose} buttonType={ButtonType.Cancel} text={'Anuluj'} />
        <ModalButton onClick={handleModalClick} buttonType={ButtonType.Delete} text={'Usuń'} />
      </ButtonWrapper>
    </PopupTemplate>
  );
};

export default DeletePopup;
