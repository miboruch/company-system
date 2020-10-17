import styled from 'styled-components';

interface WrapperProps {
  withoutPadding: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: calc(100% - 80px);
  padding: ${({ withoutPadding }) => (withoutPadding ? '0' : '0 2rem')};

  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    position: relative;
    //display: grid;
    //grid-template-columns: 25% 75%;
    //grid-template-rows: 100px auto;
    //grid-template-areas: 'title heading' 'list content';
  }
`;

export { Wrapper };
