import styled from 'styled-components';

const AddButton = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease;
  margin-right: 3rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const AddNewParagraph = styled.p`
  font-size: 13px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  letter-spacing: -1px;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-bottom: 2rem;
`;

export { AddButton, AddNewParagraph, RowWrapper };
