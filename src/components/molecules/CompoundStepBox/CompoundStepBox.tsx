import React from 'react';
import styled from 'styled-components';

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
  justify-content: space-between;
  padding: 1rem 2.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
    overflow: hidden;
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

interface Props {
  stepName: string;
  description: string;
  stepNumber: number;
  isCompleted: boolean;
  allSteps: number;
}

const CompoundStepBox: React.FC<Props> = ({ stepName, description, stepNumber, isCompleted, allSteps }) => {
  return (
    <Wrapper allSteps={allSteps}>
      <ContentWrapper>
        <Subparagraph>Krok {stepNumber}</Subparagraph>
        <Name>{stepName}</Name>
        <Subparagraph>{description}</Subparagraph>
      </ContentWrapper>
    </Wrapper>
  );
};

export default CompoundStepBox;
