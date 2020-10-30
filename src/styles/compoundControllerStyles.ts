import styled from 'styled-components';

const MainWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.white};
  top: 0;
  left: 0;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;

  ${({ theme }) => theme.mq.hdReady} {
    background-color: ${({ theme }) => theme.colors.blurBackground};
    display: grid;
    place-items: center;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  ${({ theme }) => theme.mq.hdReady} {
    width: 80%;
    height: 80vh;
    position: relative;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 30px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 25% 75%;
    grid-template-rows: 150px auto;
    grid-template-areas: 'title heading' 'list content';
  }

  ${({ theme }) => theme.mq.fullHd} {
    width: 80%;
  }
`;

const CompoundTitle = styled.h1`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 36px;
  font-weight: ${({ theme }) => theme.font.weight.demi};
  letter-spacing: -1px;
  padding: 0 4rem;
  display: none;

  ${({ theme }) => theme.mq.hdReady} {
    display: block;
    grid-area: title;
    align-self: center;
    justify-self: center;
  }
`;

const CloseButtonWrapper = styled.div`
  display: none;

  ${({ theme }) => theme.mq.hdReady} {
    display: block;
    position: absolute;
    top: 2rem;
    right: 2rem;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export { MainWrapper, Wrapper, CompoundTitle, CloseButtonWrapper, ContentWrapper };
