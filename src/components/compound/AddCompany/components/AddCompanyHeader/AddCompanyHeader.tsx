import React, { useContext } from 'react';
import styled from 'styled-components';
import { PageContext } from '../../context/PageContext';
import ArrowButton from '../../../../atoms/ArrowButton/ArrowButton';
import { Direction } from '../../../../../types/globalTypes';
import CloseButton from '../../../../atoms/CloseButton/CloseButton';

const StyledHeader = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
`;

const Text = styled.p`
  font-weight: ${({ theme }) => theme.font.weight.demi};
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
`;

interface Props {
  setBoxState: (isOpen: boolean) => void;
}

const AddCompanyHeader: React.FC<Props> = ({ setBoxState }) => {
  const { currentPage } = useContext(PageContext);
  return (
    <StyledHeader>
      {currentPage !== 0 && <ArrowButton direction={Direction.Left} />}
      <Text>Krok {currentPage + 1}</Text>
      <CloseButton setBoxState={() => setBoxState(false)} />
    </StyledHeader>
  );
};

export default AddCompanyHeader;
