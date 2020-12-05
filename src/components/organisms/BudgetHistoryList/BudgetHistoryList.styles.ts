import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: ${({ theme }) => theme.colors.white};
  // background-color: ${({ theme }) => theme.colors.dark};
  border: 1px solid ${({ theme }) => theme.colors.impactGray};
  border-radius: 30px;
  overflow-y: scroll;

  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    //height: 100%;
    min-height: auto;
    max-height: 100%;
    grid-area: history;
    align-self: center;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  //height: 100%;
  overflow-y: scroll;
`;

const Title = styled.h3`
  font-size: 18px;
  letter-spacing: -2px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.dark};
  padding: 3rem 2rem;
`;

export { StyledWrapper, ContentWrapper, Title };
