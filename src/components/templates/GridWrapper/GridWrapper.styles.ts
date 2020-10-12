import styled from 'styled-components';

interface GridProps {
  onlyHeader?: boolean;
}

const StyledWrapper = styled.div<GridProps>`
  width: 100%;
  min-height: 100vh;
  padding: 1rem 2rem;

  ${({ theme }) => theme.mq.hdReady} {
    place-items: center;
    display: grid;
    grid-template-columns: ${({ onlyHeader }) => (onlyHeader ? '35% 65%' : '25% 75%')};
    grid-template-rows: 100px auto;
    grid-template-areas: ${({ onlyHeader }) => (onlyHeader ? `'name header' 'content content'` : `'name header' 'list content'`)};
  }
`;

export { StyledWrapper };
