import React, { useContext } from 'react';
import styled from 'styled-components';
import { PageContext } from '../../context/PageContext';
import ArrowButton from '../../../../atoms/ArrowButton/ArrowButton';
import { Direction } from '../../../../../types/globalTypes';

const StyledHeader = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
`;

interface Props {}

const AddCompanyHeader: React.FC<Props> = () => {
  const { currentPage } = useContext(PageContext);
  return (
    <StyledHeader>
      <ArrowButton direction={Direction.Left} />
      <p>Krok {currentPage + 1}</p>
      <p>Close button</p>
    </StyledHeader>
  );
};

export default AddCompanyHeader;
