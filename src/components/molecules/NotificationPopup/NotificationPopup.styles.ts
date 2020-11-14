import styled from 'styled-components';

const NotificationWrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 3000;
  height: 80px;
  width: 250px;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.colors.contentBackground};
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.dark};
  padding: 0 2rem;
  flex-direction: row;

  ${({ theme }) => theme.mq.tablet} {
    display: flex;
    width: 400px;
    height: 80px;
  }
`;

const NotificationParagraph = styled.p`
  font-size: 12px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

export { NotificationWrapper, NotificationParagraph };
