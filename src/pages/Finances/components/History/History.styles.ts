import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  height: 100%;
  grid-area: content;
  background-color: #fff;

  ${({ theme }) => theme.mq.hdReady} {
    height: 100vh;
    padding: 2rem;
  }
`;

export {Content};
