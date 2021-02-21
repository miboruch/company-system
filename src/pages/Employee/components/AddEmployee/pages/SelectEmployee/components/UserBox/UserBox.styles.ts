import styled from 'styled-components';

interface WrapperProps {
  isActive: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 86px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.impactGray};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2.5rem;
  transition: background-color 0.3s ease;
  background-color: ${({ theme, isActive }) => isActive && theme.colors.backgroundHover};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }
`;

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export { Wrapper, ContentWrapper };
