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
  position: relative;

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

const MobileCircle = styled(Circle)`
  display: block;

  ${({ theme }) => theme.mq.hdReady} {
    display: none;
  }
`;

const NameParagraph = styled.p`
  font-size: 12px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

interface NewNotificationInterface {
  isNewNotification?: boolean;
}

const IconWrapper = styled.div<NewNotificationInterface>`
  width: 25px;
  height: 25px;
  margin-left: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    z-index: 10;
    right: 2px;
    left: auto;
    border-radius: 50%;
    bottom: 2px;
    width: 10px;
    height: 10px;
    background-color: ${({ theme }) => theme.colors.red};
  }
`;

export { StyledHeader, UserWrapper, Circle, NameParagraph, IconWrapper, MobileCircle };
