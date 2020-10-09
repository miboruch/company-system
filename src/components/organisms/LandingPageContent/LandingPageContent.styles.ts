import styled from 'styled-components';

const Content = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
  grid-area: content;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  grid-area: name;
`;

const List = styled.div`
  width: 100%;
  height: 100%;
  background-color: yellow;
  grid-area: list;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  width: 100%;
  height: 100%;
  background-color: blue;
  grid-area: header;
`;

const Test = styled.section`
  width: 100%;
  height: 50%;
  background-color: brown;

  ${({ theme }) => theme.mq.desktop} {
    display: none;
  }
`;

export { Content, Title, List, Header, Test };
