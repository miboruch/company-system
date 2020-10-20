import styled from 'styled-components';

const StyledHeader = styled.header`
  width: 100%;
  height: 60px;
  background-color: white;
  position: relative;
  //position: fixed;
  //top: 0;
  //left: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 2rem;
  padding: 0 2rem;
  align-items: center;

  ${({ theme }) => theme.mq.hdReady} {
    display: none;
  }
`;

const Circle = styled.div`
  width: 33px;
  height: 33px;
  background-color: #c4c4c4;
  border-radius: 50%;
`;

export { StyledHeader, Circle };
