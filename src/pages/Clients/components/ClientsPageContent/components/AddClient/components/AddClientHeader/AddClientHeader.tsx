import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { ArrowButton, CloseButton } from 'components/index';
import { Direction } from 'types/globalTypes';
import { setAddNewClientOpen } from 'ducks/client/client-toggle/client-toggle';
import { PageContext } from '../../context/PageContext';

import { Paragraph, StyledHeader } from 'styles';

const AddClientHeader: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const handleArrowClick = () => currentPage !== 0 && setCurrentPage(currentPage - 1);
  const handleClose = () => dispatch(setAddNewClientOpen(false));

  return (
    <StyledHeader>
      <ArrowButton direction={Direction.Left} isHidden={currentPage === 0} onClick={handleArrowClick} />
      <Paragraph type={'main'}>Krok {currentPage + 1}</Paragraph>
      <CloseButton close={handleClose} />
    </StyledHeader>
  );
};

export default AddClientHeader;
