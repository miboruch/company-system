import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

interface ColumnWrapperInterface {
  disabled?: boolean;
}

const ColumnWrapper = styled.div<ColumnWrapperInterface>`
  width: 50%;
  height: 100%;
  padding: 3rem;
  opacity: ${({ disabled }) => (disabled ? 0 : 1)};
  visibility: ${({ disabled }) => (disabled ? 'hidden' : 'visible')};
  transition: opacity 0.5s ease, visibility 0.5s ease;
`;

const Heading = styled.h2`
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-bottom: 2rem;
  margin-left: 2rem;
`;

export { Wrapper, ColumnWrapper, Heading };
