import styled from 'styled-components';

const InfoBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 3rem 0;

  ${({ theme }) => theme.mq.hdReady} {
    display: contents;
  }
`;

export { InfoBoxWrapper };
