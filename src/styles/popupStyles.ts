import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.blurBackground};
  display: grid;
  place-items: center;
  z-index: 1001;
  opacity: 0;
  visibility: hidden;
`;

interface BoxInterface {
  isHigher: boolean;
}

const Box = styled.div<BoxInterface>`
  width: 90%;
  //height: 400px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.white};
  overflow: hidden;

  ${({ theme }) => theme.mq.hdReady} {
    width: 700px;
    // height: ${({ isHigher }) => (isHigher ? '380px' : '300px')};
  }
`;

const Header = styled.header`
  width: 100%;
  height: 80px;
  padding: 0 3rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f7f8fc;
`;

const HeaderText = styled.p`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.font.weight.demi};
  color: ${({ theme }) => theme.colors.dark};
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: calc(100% - 160px);
  display: grid;
  place-items: center;
  padding: 2rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #f7f8fc;
`;

export { Wrapper, Box, Header, HeaderText, ContentWrapper, ButtonWrapper };
