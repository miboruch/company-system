import styled from 'styled-components';

const StyledHeader = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;

  ${({ theme }) => theme.mq.hdReady} {
    display: none;
  }
`;

export { StyledHeader };
