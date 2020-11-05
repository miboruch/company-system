import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 90%;
  height: 80vh;
  border: 1px solid #ccc;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: 4rem;
  right: 0;
  z-index: 1001;

  ${({ theme }) => theme.mq.hdReady} {
    width: 400px;
    height: 500px;
  }
`;

const Header = styled.header`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #f7f8fc;
  display: flex;
  align-items: center;
  padding: 0 2rem;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  overflow-y: scroll;
`;

export { StyledWrapper, Header, Content };
