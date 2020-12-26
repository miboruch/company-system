import styled from 'styled-components';
import { MapWrapper } from 'styles/compoundStyles';

const StyledWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  z-index: 1500;
  background-color: ${({ theme }) => theme.colors.blurBackground};
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
  position: relative;

  ${({ theme }) => theme.mq.hdReady} {
    width: 80%;
    height: 80%;
    border-radius: 30px;
  }
`;

const StyledMapWrapper = styled(MapWrapper)`
  height: 100%;
`;

export { StyledWrapper, Box, StyledMapWrapper };
