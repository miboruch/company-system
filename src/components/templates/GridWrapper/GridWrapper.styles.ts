import styled from 'styled-components';

interface GridProps {
  onlyHeader?: boolean;
}

const StyledWrapper = styled.div<GridProps>`
  width: 100%;
  min-height: calc(100vh - 80px);
  //padding: 0 2rem;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;

  ${({ theme }) => theme.mq.hdReady} {
    place-items: center;
    justify-content: flex-start;
    display: grid;
    grid-template-columns: ${({ onlyHeader }) => (onlyHeader ? '35% 65%' : '25% 75%')};
    grid-template-rows: 100px auto;
    grid-template-areas: ${({ onlyHeader }) => (onlyHeader ? `'name header' 'content content'` : `'name header' 'list content'`)};
  }
`;

export { StyledWrapper };
