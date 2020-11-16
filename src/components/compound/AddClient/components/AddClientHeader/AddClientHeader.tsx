import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import ArrowButton from '../../../../atoms/ArrowButton/ArrowButton';
import { Direction } from '../../../../../types/globalTypes';
import CloseButton from '../../../../atoms/CloseButton/CloseButton';
import { PageContext } from '../../context/PageContext';
import { StyledHeader } from '../../../styles/headerStyles';
import { Paragraph } from '../../../../../styles/typography/typography';
import { setAddNewClientOpen } from '../../../../../actions/clientActions';

const AddClientHeader: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, setCurrentPage } = useContext(PageContext);
  return (
    <StyledHeader>
      <ArrowButton direction={Direction.Left} isHidden={currentPage === 0} onClick={() => currentPage !== 0 && setCurrentPage(currentPage - 1)} />
      <Paragraph type={'main'}>Krok {currentPage + 1}</Paragraph>
      <CloseButton setBoxState={() => dispatch(setAddNewClientOpen(false))} />
    </StyledHeader>
  );
};

export default AddClientHeader;
