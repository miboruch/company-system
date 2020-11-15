import React, { useContext } from 'react';
import { PageContext } from '../../context/PageContext';
import ArrowButton from '../../../../atoms/ArrowButton/ArrowButton';
import CloseButton from '../../../../atoms/CloseButton/CloseButton';
import { StyledHeader } from '../../../styles/headerStyles';
import { Paragraph } from '../../../../../styles/typography/typography';
import { Direction } from '../../../../../types/globalTypes';

interface Props {
  setBoxState: (isOpen: boolean) => void;
}

const AddCompanyHeader: React.FC<Props> = ({ setBoxState }) => {
  const { currentPage, setCurrentPage } = useContext(PageContext);

  return (
    <StyledHeader>
      <ArrowButton direction={Direction.Left} isHidden={currentPage === 0} onClick={() => currentPage !== 0 && setCurrentPage(currentPage - 1)} />
      <Paragraph type={'main'}>Krok {currentPage + 1}</Paragraph>
      <CloseButton setBoxState={() => setBoxState(false)} />
    </StyledHeader>
  );
};

export default AddCompanyHeader;
