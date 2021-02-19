import styled, { css } from 'styled-components';

interface TableProps {
  isEmpty: boolean;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.mq.hdReady} {
    display: flex;
    justify-content: center;
    grid-area: content;
    background-color: #fff;
  }
`;

const Table = styled.section<TableProps>`
  width: 98%;
  height: 80vh;
  border: 1px solid ${({ theme }) => theme.colors.impactGray};
  border-radius: 30px;
  margin-top: 2rem;
  overflow: hidden;
  overflow-y: scroll;

  ${({ theme }) => theme.mq.hdReady} {
    grid-area: content;
    width: 92%;
    border-radius: 15px;
    align-self: flex-start;
    margin: 0;
  }

  ${({ isEmpty }) =>
    isEmpty &&
    css`
      height: 60px;
      display: grid;
      place-items: center;
    `}
`;

export { Wrapper, Table };
