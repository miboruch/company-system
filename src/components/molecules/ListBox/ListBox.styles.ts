import styled from 'styled-components';
import { Paragraph } from '../../../styles/typography/typography';

const Wrapper = styled.div`
  width: 100%;
  height: 86px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.impactGray};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2.5rem;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }
`;

const Name = styled(Paragraph)`
  color: ${({ theme }) => theme.colors.dark};
  margin: 0.2rem 0;
  line-height: 18px;
`;

const Subparagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.colors.textGray};
  font-size: 11px;
  margin: 0;
  line-height: normal;
`;

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ValueParagraph = styled.h3`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.font.weight.demi};
  letter-spacing: -1px;
  color: ${({ theme }) => theme.colors.dark};
  padding-right: 1rem;
`;

export { Wrapper, ContentWrapper, Name, Subparagraph, ValueParagraph };
