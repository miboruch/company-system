import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.impactGray};
  border-radius: 30px;
  overflow-y: scroll;
  padding-top: 3rem;

  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    min-height: auto;
    max-height: 100%;
    grid-area: history;
    align-self: center;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  overflow-y: scroll;
`;

const Title = styled(Link)`
  font-size: 18px;
  letter-spacing: -2px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.dark};
  margin: 3rem 2rem;
`;

export { StyledWrapper, ContentWrapper, Title };
