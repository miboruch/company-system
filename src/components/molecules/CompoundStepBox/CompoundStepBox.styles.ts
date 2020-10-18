import styled from 'styled-components';
import { ReactComponent as Completed } from '../../../assets/icons/completed.svg';

interface WrapperProps {
  allSteps: number;
}

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: ${({ allSteps }) => allSteps && `calc(100% / ${allSteps})`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.impactGray};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 2.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
    overflow: hidden;
    cursor: pointer;
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

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

interface CompletedIconProps {
  isCompleted: boolean;
}

const CompletedIcon = styled(Completed)<CompletedIconProps>`
  width: 32px;
  height: 32px;
  margin-right: 2rem;
  border: ${({ theme, isCompleted }) => !isCompleted && `1px solid ${theme.colors.gray}`};
  border-radius: 50%;

  path {
    opacity: ${({ isCompleted }) => (isCompleted ? 1 : 0)};
    transition: opacity 0.7s ease;
  }
`;

export { Wrapper, Name, Subparagraph, ContentWrapper, CompletedIcon };
