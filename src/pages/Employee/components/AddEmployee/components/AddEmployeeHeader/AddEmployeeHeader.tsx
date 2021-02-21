import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { ArrowButton, CloseButton } from 'components';
import { Direction } from 'types/globalTypes';
import { setAddNewEmployeeOpen } from 'ducks/employees/employees-toggle/employees-toggle';
import { PageContext } from '../../context/PageContext';

import { StyledHeader } from 'components/compound/styles/headerStyles';
import { Paragraph } from 'styles/typography/typography';

const AddEmployeeHeader: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const handleArrowClick = () => currentPage !== 0 && setCurrentPage(currentPage - 1);
  const handleClose = () => dispatch(setAddNewEmployeeOpen(false));

  return (
    <StyledHeader>
      <ArrowButton direction={Direction.Left} isHidden={currentPage === 0} onClick={handleArrowClick} />
      <Paragraph type={'main'}>Krok {currentPage + 1}</Paragraph>
      <CloseButton close={handleClose} />
    </StyledHeader>
  );
};

export default AddEmployeeHeader;
