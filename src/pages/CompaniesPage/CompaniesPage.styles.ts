import styled from 'styled-components';

interface TableProps {
  isEmpty: boolean;
}

const Table = styled.section<TableProps>`
  width: 98%;
  height: ${({ isEmpty }) => (isEmpty ? 'auto' : '80vh')};
  border: 1px solid ${({ theme }) => theme.colors.impactGray};
  border-radius: 30px;
  margin-top: 2rem;
  overflow: hidden;
  overflow-y: scroll;

  ${({ theme }) => theme.mq.hdReady} {
    grid-area: content;
    width: 90%;
    margin-top: 0;
    border-radius: 15px;
  }
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
`;

export { Table, AddCompanyWrapper };
