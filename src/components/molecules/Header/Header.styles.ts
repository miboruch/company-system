import styled from 'styled-components';

interface HeaderProps {
  isInput: boolean;
}

const StyledHeader = styled.header<HeaderProps>`
  width: 100%;
  height: 60px;
  background-color: transparent;
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
    width: 100%;
    height: 100%;
    // border-bottom: 1px solid ${({ theme }) => theme.colors.impactGray};
    display: flex;
    padding-right: 5rem;
    background-color: #fff;
    flex-direction: row;
    justify-content: ${({ isInput }) => (isInput ? 'space-between' : 'flex-end')};
    align-items: center;
    grid-area: header;
    margin: 0;
  }
`;

const UserWrapper = styled.div`
  display: none;

  ${({ theme }) => theme.mq.hdReady} {
    display: flex;
    align-items: center;
    flex-direction: row;
  }
`;

const Circle = styled.div`
  width: 33px;
  height: 33px;
  background-color: #c4c4c4;
  border-radius: 50%;
  margin-left: 2rem;
`;

const NameParagraph = styled.p`
  font-size: 13px;
`;

export { StyledHeader, UserWrapper, Circle, NameParagraph };
