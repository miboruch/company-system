import React, { useContext } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { PageContext } from '../../context/PageContext';
import ArrowButton from '../../../../atoms/ArrowButton/ArrowButton';
import { Direction } from '../../../../../types/globalTypes';
import CloseButton from '../../../../atoms/CloseButton/CloseButton';
import { setAddNewEmployeeOpen } from '../../../../../actions/employeeActions';

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

const AddEmployeeHeader: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, setCurrentPage } = useContext(PageContext);
  return (
    <StyledHeader>
      <ArrowButton direction={Direction.Left} isHidden={currentPage === 0} onClick={() => currentPage !== 0 && setCurrentPage(currentPage - 1)} />
      <Text>Krok {currentPage + 1}</Text>
      <CloseButton close={() => dispatch(setAddNewEmployeeOpen(false))} />
    </StyledHeader>
  );
};

export default AddEmployeeHeader;
