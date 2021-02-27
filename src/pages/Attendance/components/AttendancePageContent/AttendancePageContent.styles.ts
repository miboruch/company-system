import styled from 'styled-components';

const ListWrapper = styled.section`
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.mq.hdReady} {
    background-color: #fff;
    grid-area: list;
  }
`;

const List = styled.div`
  width: 100%;
  height: 100%;
`;

const DatePickerWrapper = styled.div`
  width: 70%;
  padding-left: 2rem;

  ${({ theme }) => theme.mq.standard} {
    width: 100%;
    padding-left: 0;
  }
`;

export { ListWrapper, List, DatePickerWrapper };
