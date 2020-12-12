import styled from 'styled-components';
import { Heading } from '../../../styles/typography/typography';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.impactGray};
  border-radius: 30px;
  overflow: hidden;

  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    height: 100%;
    min-height: auto;
    grid-area: attendance;
    align-self: center;
  }
`;

const DateHeading = styled(Heading)`
  font-size: 18px;
  margin: 3rem 2rem;
  letter-spacing: -1px;
  color: ${({ theme }) => theme.colors.dark};
`;

export { StyledWrapper, DateHeading };
