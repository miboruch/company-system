import styled from 'styled-components';

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.contentBackground};
  z-index: 1001;

  ${({ theme }) => theme.mq.hdReady} {
    position: static;
    background-color: #fff;
    // background-color: ${({ theme }) => theme.colors.backgroundHover};
    //background-color: #F8F9FA;
    //background-color: ${({ theme }) => theme.colors.contentBackground};
    z-index: auto;
  }
`;

const ArrowAbsoluteWrapper = styled.div`
  position: fixed;
  top: 3rem;
  left: 2rem;
  z-index: 100;

  ${({ theme }) => theme.mq.hdReady} {
    display: none;
  }
`;

export { ContentWrapper, ArrowAbsoluteWrapper };
