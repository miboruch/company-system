import styled, { css } from 'styled-components';

export type ParagraphTypes = 'subparagraph' | 'text' | 'info';

interface ParagraphInterface {
  type?: ParagraphTypes;
}

const Paragraph = styled.p<ParagraphInterface>`
  font-size: 13px;
  color: #d3d3d4;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-bottom: 1rem;
  line-height: 2.2;
  transition: color 0.3s ease;

  ${({ type }) =>
    type === 'subparagraph' &&
    css`
      color: #78787f;
      margin: 0;
    `}

  ${({ type }) =>
    type === 'text' &&
    css`
      color: #454545;
    `}
  
    ${({ type }) =>
    type === 'info' &&
    css`
      font-size: 12px;
      color: ${({ theme }) => theme.colors.textGray};
      text-align: center;
    `}
`;

export { Paragraph };
