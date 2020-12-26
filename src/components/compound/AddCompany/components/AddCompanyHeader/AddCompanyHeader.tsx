import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import ArrowButton from 'components/atoms/ArrowButton/ArrowButton';
import CloseButton from 'components/atoms/CloseButton/CloseButton';

import { Direction } from 'types/globalTypes';
import { setAddCompanyOpen } from 'ducks/company/company-toggle/company-toggle';
import { PageContext } from '../../context/PageContext';
import { StyledHeader } from '../../../styles/headerStyles';
import { Paragraph } from 'styles/typography/typography';

const AddCompanyHeader: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const handleArrowClick = () =>  currentPage !== 0 && setCurrentPage(currentPage - 1);
  const handleCloseButtonClick = () => dispatch(setAddCompanyOpen(false));

  return (
    <StyledHeader>
      <ArrowButton direction={Direction.Left} isHidden={currentPage === 0} onClick={handleArrowClick} />
      <Paragraph type={'main'}>Krok {currentPage + 1}</Paragraph>
      <CloseButton close={handleCloseButtonClick} />
    </StyledHeader>
  );
};

export default AddCompanyHeader;
