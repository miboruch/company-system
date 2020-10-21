import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mq.hdReady} {
    position: static;
    background-color: ${({ theme }) => theme.colors.contentBackground};
  }
`;

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const ContentTemplate: React.FC<Props> = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default ContentTemplate;
