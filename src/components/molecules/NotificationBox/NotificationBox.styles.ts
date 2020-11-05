import styled from 'styled-components';

const NotificationWrapper = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #f7f8fc;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.dark};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin: 0.2rem 0;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.borderBottomDark};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-size: 11px;
  margin: 0;
`;

const NewNotificationDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.red};
`;

const Date = styled.p`
  margin-top: 0.5rem;
  font-size: 12px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: ${({ theme }) => theme.colors.textGray};
`;

export { NotificationWrapper, TextWrapper, Title, Description, NewNotificationDot, Date };
