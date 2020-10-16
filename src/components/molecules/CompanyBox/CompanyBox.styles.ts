import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.impactGray};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1rem 2.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }
`;

const Name = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.dark};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin: 0.2rem 0;
`;

const Subparagraph = styled.p`
  color: ${({ theme }) => theme.colors.textGray};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-size: 11px;
  margin: 0;
`;

export { Wrapper, Name, Subparagraph };
