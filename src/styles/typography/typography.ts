import styled, { css } from 'styled-components';

export type ParagraphTypes = 'main' | 'subparagraph' | 'text' | 'info' | 'add' | 'empty' | 'error' | 'back';

interface ParagraphInterface {
  type?: ParagraphTypes;
}

const Paragraph = styled.p<ParagraphInterface>`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.paragraph};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-bottom: 1rem;
  line-height: 2.2;
  transition: color 0.3s ease;

  ${({ type }) =>
    type === 'main' &&
    css`
      color: ${({ theme }) => theme.colors.black};
      font-size: 14px;
      font-weight: ${({ theme }) => theme.font.weight.demi};
    `}

  ${({ type }) =>
    type === 'subparagraph' &&
    css`
      color: ${({ theme }) => theme.colors.textSubparagraph};
      margin-top: 0.3rem;
      margin-bottom: 0.3rem;
    `}

  ${({ type }) =>
    type === 'text' &&
    css`
      color: ${({ theme }) => theme.colors.textParagraph};
    `}
  
    ${({ type }) =>
    type === 'info' &&
    css`
      font-size: 12px;
      color: ${({ theme }) => theme.colors.textGray};
      text-align: center;
    `}
    
    ${({ type }) =>
    type === 'add' &&
    css`
      color: ${({ theme }) => theme.colors.black};
      margin-top: 0.2rem;
      margin-left: 1.5rem;
    `}
        
    ${({ type }) =>
    type === 'empty' &&
    css`
      font-size: 14px;
      color: ${({ theme }) => theme.colors.emptyText};
    `}
    
    ${({ type }) =>
    type === 'back' &&
    css`
      color: ${({ theme }) => theme.colors.landingGray};
      cursor: pointer;
    `}
`;

interface ErrorParagraphInterface {
  isVisible: boolean;
}

const ErrorParagraph = styled.p<ErrorParagraphInterface>`
  margin-top: 2rem;
  margin-bottom: 0;
  color: tomato;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: 2.2;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

const PageNameHeading = styled.h1`
  grid-area: name;
  font-weight: ${({ theme }) => theme.font.weight.demi};
  align-self: flex-start;
  padding: 0 2rem;
  font-size: 30px;
  letter-spacing: -1px;
  margin: 3rem 0;

  ${({ theme }) => theme.mq.hdReady} {
    font-weight: ${({ theme }) => theme.font.weight.demi};
    align-self: center;
    justify-self: flex-start;
    padding: 0 1rem;
    margin-left: 3rem;
    margin-top: 0;
    margin-bottom: 0;
  }

  ${({ theme }) => theme.mq.quadHd} {
    margin-left: 5rem;
  }
`;

const Heading = styled.h1`
  font-size: 22px;
  font-weight: ${({ theme }) => theme.font.weight.demi};
  margin-bottom: 1.5rem;
`;

export { Paragraph, ErrorParagraph, PageNameHeading, Heading };
