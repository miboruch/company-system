import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  height: 100%;
  grid-area: content;
`;

const List = styled.div`
  width: 100%;
  height: 100%;
  //background-color: yellow;
  grid-area: list;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  height: 100%;
  background-color: blue;
  grid-area: header;
  display: none;

  ${({ theme }) => theme.mq.hdReady} {
    display: block;
  }
`;

const Test = styled.section`
  width: 100%;
  height: 50%;
  background-color: brown;

  ${({ theme }) => theme.mq.hdReady} {
    display: none;
  }
`;

const TileWrapper = styled.section`
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  overflow-x: scroll;
  flex-direction: row;
`;

const ChartWrapper = styled.div`
  width: 100%;
  overflow-x: scroll;
  margin-top: 3rem;
`;

export { Content, List, Header, Test, TileWrapper, ChartWrapper };
