import styled from 'styled-components';
import { MobileCompoundTitle } from '../../../../../styles/sharedStyles';

const MapWrapper = styled.div`
  width: 100%;
  height: calc(100% - 130px);
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  overflow: hidden;
  margin-top: 0;
  z-index: 5;
  position: relative;

  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    grid-area: content;
    height: 100%;
    border-bottom-right-radius: 30px;
  }
`;

const StyledCompoundTitle = styled(MobileCompoundTitle)`
  padding: 0 2rem;
  justify-self: flex-start;

  ${({ theme }) => theme.mq.hdReady} {
    grid-area: heading;
    align-self: center;
    margin: 0;
  }
`;

const SubheadingWrapper = styled.div`
  width: 100%;
  height: 50px;

  ${({ theme }) => theme.mq.hdReady} {
    grid-area: heading;
  }
`;

const CenterBox = styled.div`
  width: 50px;
  height: 15px;
  background-color: white;
  position: absolute;
  top: 50%;
  right: 5rem;
  z-index: 50;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 110px;
  display: grid;
  place-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: white;
  
  ${({theme}) => theme.mq.hdReady}{
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 2rem;
  }
`;

export { MapWrapper, StyledCompoundTitle, SubheadingWrapper, CenterBox, ButtonWrapper };
