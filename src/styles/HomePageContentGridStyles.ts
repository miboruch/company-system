import styled, { css } from 'styled-components';

interface ContentGridWrapperInterface {
  isFinancesPage?: boolean;
}

const ContentGridWrapper = styled.section<ContentGridWrapperInterface>`
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.mq.hdReady} {
    width: calc(100% - 2 * 2rem);
    height: calc(100% - 2 * 2rem);
    display: grid;
    grid-template-columns: 29% 29% 42%;
    grid-template-rows: 28% 43% 29%;
    grid-template-areas: 'task task attendance' 'chart chart attendance' 'employees completedTasks attendance';
    //margin: 2rem 3rem;
    padding: 2rem 3rem;
    grid-gap: 2rem;

    ${({ isFinancesPage }) =>
      isFinancesPage &&
      css`
        grid-template-areas: 'budget budget history' 'chart chart history' 'currency buttons info';
      `}
  }

  ${({ theme }) => theme.mq.quadHd} {
    grid-template-columns: 33% 33% 34%;
  }
`;

export { ContentGridWrapper };
