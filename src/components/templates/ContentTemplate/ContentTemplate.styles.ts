import styled from 'styled-components';

interface ContentProps {
  isOpen: boolean;
}

const ContentWrapper = styled.div<ContentProps>`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};

  ${({ theme }) => theme.mq.hdReady} {
    position: static;
    background-color: ${({ theme }) => theme.colors.contentBackground};
    opacity: 1;
    visibility: visible;
  }
`;

export { ContentWrapper };
