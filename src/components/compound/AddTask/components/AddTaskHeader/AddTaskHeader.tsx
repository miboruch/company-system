import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import ArrowButton from '../../../../atoms/ArrowButton/ArrowButton';
import CloseButton from '../../../../atoms/CloseButton/CloseButton';
import { Direction } from '../../../../../types/globalTypes';
import { setAddNewTaskOpen } from '../../../../../ducks/tasks/tasks-toggle/tasks-toggle';
import { PageContext } from '../../context/PageContext';
import { StyledHeader } from '../../../styles/headerStyles';
import { Paragraph } from '../../../../../styles/typography/typography';

const AddTaskHeader: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, setCurrentPage } = useContext(PageContext);
  return (
    <StyledHeader>
      <ArrowButton direction={Direction.Left} isHidden={currentPage === 0} onClick={() => currentPage !== 0 && setCurrentPage(currentPage - 1)} />
      <Paragraph type={'main'}>Krok {currentPage + 1}</Paragraph>
      <CloseButton close={() => dispatch(setAddNewTaskOpen(false))} />
    </StyledHeader>
  );
};

export default AddTaskHeader;
