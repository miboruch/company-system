import styled, { css } from 'styled-components';

interface TableProps {
  isEmpty: boolean;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  
    ${({ theme }) => theme.mq.hdReady} {
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

const AddCompanyWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
  cursor: pointer;
`;

const AddCompanyParagraph = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-top: 0.2rem;
  margin-left: 1.5rem;
`;

export { Wrapper, Table, AddCompanyWrapper, AddCompanyParagraph };
