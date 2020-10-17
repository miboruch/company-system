import styled from 'styled-components';

interface WrapperProps {
  withoutPadding: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;
  padding: ${({ withoutPadding }) => (withoutPadding ? '0' : '0 2rem')};
  display: grid;
  place-items: center;

  ${({ theme }) => theme.mq.hdReady} {
    width: 80%;
    height: 80vh;
    background-color: ${({ theme }) => theme.colors.white};
    position: relative;
  }
`;

export { Wrapper };
