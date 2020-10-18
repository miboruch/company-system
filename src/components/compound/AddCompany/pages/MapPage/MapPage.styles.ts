import styled from 'styled-components';

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

const HeadingWrapper = styled.div`
  width: 100%;
  height: 50px;
  padding-left: 2.5rem;

  ${({ theme }) => theme.mq.hdReady} {
    display: none;
  }
`;

const CenterBox = styled.div`
  width: 100px;
  height: 30px;
  font-size: 12px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.dark};
  display: grid;
  place-items: center;
  background-color: white;
  position: absolute;
  bottom: 120px;
  right: 2rem;
  z-index: 50;
  cursor: pointer;
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

  ${({ theme }) => theme.mq.hdReady} {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 2rem;
  }
`;

export { MapWrapper, HeadingWrapper, CenterBox, ButtonWrapper };
