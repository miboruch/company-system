import styled, { css } from 'styled-components';

interface ContentGridWrapperInterface {
  isFinancesPage?: boolean;
}

const ContentGridWrapper = styled.section<ContentGridWrapperInterface>`
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.mq.hdReady} {
    width: calc(100% - 2 * 2rem);
    height: calc(100% - 100px - 2 * 2rem);
    display: grid;
    grid-template-columns: 29% 29% 42%;
    grid-template-rows: 30% 50% 20%;
    grid-template-areas: 'task task attendance' 'chart chart attendance' 'employees completedTasks info';
    padding: 0 2rem;
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
