import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 86px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderBottomDark};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
  }
`;

const Name = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin: 0.2rem 0;
`;

const Subparagraph = styled.p`
  color: ${({ theme }) => theme.colors.textGray};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  font-size: 11px;
  margin: 0;
`;

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export { Wrapper, ContentWrapper, Name, Subparagraph };
