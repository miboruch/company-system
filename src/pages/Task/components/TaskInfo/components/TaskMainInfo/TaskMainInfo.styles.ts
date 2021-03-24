import styled from 'styled-components';
import { Paragraph } from 'styles';

const ColoredParagraph = styled(Paragraph)<{ isCompleted: boolean }>`
  color: ${({ theme, isCompleted }) => (isCompleted ? theme.colors.red : theme.colors.green)};
  cursor: pointer;
`;

export { ColoredParagraph };
