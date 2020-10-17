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

  ${({ theme }) => theme.mq.hdReady} {
    display: none;
  }
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
  const { currentPage, setCurrentPage } = useContext(PageContext);

  return (
    <StyledHeader>
      <ArrowButton direction={Direction.Left} isHidden={currentPage === 0} onClick={() => currentPage !== 0 && setCurrentPage(currentPage - 1)} />
      <Text>Krok {currentPage + 1}</Text>
      <CloseButton setBoxState={() => setBoxState(false)} />
    </StyledHeader>
  );
};

export default AddCompanyHeader;
