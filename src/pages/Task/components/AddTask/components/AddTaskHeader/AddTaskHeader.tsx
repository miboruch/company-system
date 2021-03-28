import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { ArrowButton, CloseButton } from 'components';
import { setAddNewTaskOpen } from 'ducks/tasks/tasks-toggle/tasks-toggle';
import { PageContext } from '../../context/PageContext';

import { Paragraph, StyledHeader } from 'styles';

const AddTaskHeader: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const handleArrowClick = () => currentPage !== 0 && setCurrentPage(currentPage - 1);
  const handleAddTaskClose = () => dispatch(setAddNewTaskOpen(false));

  return (
    <StyledHeader>
      <ArrowButton direction={'left'} isHidden={currentPage === 0} onClick={handleArrowClick} />
      <Paragraph type={'main'}>Krok {currentPage + 1}</Paragraph>
      <CloseButton close={handleAddTaskClose} />
    </StyledHeader>
  );
};

export default AddTaskHeader;
