import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 2rem;

  ${({ theme }) => theme.mq.hdReady} {
    width: 80%;
    height: 80vh;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export { Wrapper };
