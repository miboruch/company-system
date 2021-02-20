import styled from 'styled-components';
import { Heading } from 'styles';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.blurBackground};
  display: grid;
  place-items: center;
  z-index: 1000;
`;

const Box = styled.div`
  width: 90%;
  height: 400px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 30px;
  overflow: hidden;

  ${({ theme }) => theme.mq.hdReady} {
    width: 1000px;
    height: 500px;
    display: flex;
    flex-direction: row;
  }
`;

const ListWrapper = styled.div`
  width: 300px;
  height: 100%;
  padding: 2rem 0;
  border-right: 1px solid ${({ theme }) => theme.colors.impactGray};
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem;
`;

interface TextWrapperInterface {
  isVisible: boolean;
}

const StyledHeading = styled(Heading)`
  margin-left: 3rem;
`;

const TextWrapper = styled.div<TextWrapperInterface>`
  margin-top: 4rem;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
`;

const Span = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;

export { StyledWrapper, Box, ListWrapper, ContentWrapper, StyledHeading, TextWrapper, Span };
