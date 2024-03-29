import styled from 'styled-components';
import { Heading } from 'styles';

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

const InfoWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 3rem 0;

  ${({ theme }) => theme.mq.hdReady} {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 5rem;
    grid-area: info;
    //padding: 5rem;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.menuBackground};
    border-radius: 30px;
    margin: 0;
  }
`;

const StatisticsHeading = styled(Heading)`
  margin-bottom: 0;
  font-size: 22px;
  font-weight: ${({ theme }) => theme.font.weight.demi};
  text-overflow: ellipsis;
  max-width: 200px;

  ${({ theme }) => theme.mq.hdReady} {
    margin-bottom: 1.5rem;
  }
`;

export { Content, List, Header, Test, InfoWrapper, StatisticsHeading };
