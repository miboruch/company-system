import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  height: 100%;
  grid-area: content;
  background-color: #F8F8F8;

  ${({ theme }) => theme.mq.hdReady} {
    height: 100vh;
    padding: 2rem;
  }
`;

export {Content};
