import styled from 'styled-components';

const ContentGridWrapper = styled.section`
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.mq.hdReady} {
    width: calc(100% - 3 * 2rem);
    height: calc(100% - 3 * 2rem);
    display: grid;
    grid-template-columns: 29% 29% 42%;
    grid-template-rows: 28% 43% 29%;
    grid-template-areas: 'task task attendance' 'chart chart attendance' 'employees completedTasks attendance';
    padding: 2rem;
    grid-gap: 2rem;
  }
  
  ${({theme}) => theme.mq.quadHd}{
    grid-template-columns: 33% 33% 34%;
  }
`;

export { ContentGridWrapper };
