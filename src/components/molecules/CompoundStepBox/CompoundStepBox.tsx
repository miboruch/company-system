import React from 'react';
import { Wrapper, Name, Subparagraph, ContentWrapper, CompletedIcon } from './CompoundStepBox.styles';

interface Props {
  stepName: string;
  description: string;
  stepNumber: number;
  isCompleted: boolean;
  allSteps: number;
  onClick: () => void;
}

const CompoundStepBox: React.FC<Props> = ({ stepName, description, stepNumber, isCompleted, allSteps, onClick }) => {
  return (
    <Wrapper allSteps={allSteps} onClick={onClick}>
      <CompletedIcon isCompleted={isCompleted} />
      <ContentWrapper>
        <Subparagraph type={'subparagraph'}>Krok {stepNumber}</Subparagraph>
        <Name>{stepName}</Name>
        <Subparagraph type={'subparagraph'}>{description}</Subparagraph>
      </ContentWrapper>
    </Wrapper>
  );
};

export default CompoundStepBox;
