import styled from 'styled-components';

const NotificationWrapper = styled.div`
  display: none;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 3000;
  height: 80px;
  width: 400px;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.colors.contentBackground};
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.dark};
  padding: 0 2rem;
  flex-direction: row;

  ${({ theme }) => theme.mq.hdReady} {
    display: flex;
  }
`;

const NotificationParagraph = styled.p`
  font-size: 12px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

export { NotificationWrapper, NotificationParagraph };
