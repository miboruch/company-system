import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { modalOpenAnimation } from '../../../animations/animations';
import ModalButton, { ButtonType } from '../../atoms/ModalButton/ModalButton';
import { Wrapper, Box, Header, HeaderText, ContentWrapper, ButtonWrapper, Paragraph, InfoParagraph } from './DeletePopup.styles';

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  headerText: string;
  text: string;
}

const DeletePopup: React.FC<Props> = ({ isOpen, setOpen, headerText, text }) => {
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  // useOutsideClick(wrapperRef, isOpen, () => setOpen(false));

  useEffect(() => {
    modalOpenAnimation(tl, backgroundRef, boxRef);
  }, []);

  useEffect(() => {
    isOpen ? tl.play() : tl.reverse();
  }, [isOpen]);

  return (
    <Wrapper>
      <Box>
        <Header>
          <HeaderText>{headerText}</HeaderText>
        </Header>
        <ContentWrapper>
          <Paragraph>
            Czy jesteś pewnien, że chcesz usunąć <strong>{text}</strong>?
          </Paragraph>
          <InfoParagraph>W razie pomyłki nie będzie możliwości cofnięcia tej akcji</InfoParagraph>
        </ContentWrapper>
        <ButtonWrapper>
          <ModalButton onClick={() => console.log('close modal')} buttonType={ButtonType.Cancel} text={'Anuluj'} />
          <ModalButton onClick={() => console.log('delete task')} buttonType={ButtonType.Delete} text={'Usuń'} />
        </ButtonWrapper>
        <p>Test</p>
      </Box>
    </Wrapper>
  );
};

export default DeletePopup;
