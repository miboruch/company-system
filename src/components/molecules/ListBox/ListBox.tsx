import React from 'react';

import ArrowButton from '../../atoms/ArrowButton/ArrowButton';

import { ContentWrapper, Name, Subparagraph, Wrapper, ValueParagraph } from './ListBox.styles';
import { CheckedIcon, EmptyIcon, NotCheckedIcon, EditIcon } from 'styles/iconStyles';

interface Props {
  name: string;
  topDescription: string | Date;
  bottomDescription: string;
  callback: () => void;
  isCompanyBox: boolean;
  isEmpty?: boolean;
  isChecked?: boolean;
  value?: number | string;
  editCallback?: () => void;
}

export type ListBoxProps = Props;

const ListBox: React.FC<ListBoxProps> = ({ name, topDescription, bottomDescription, callback, isEmpty, isChecked, isCompanyBox, value, editCallback }) => {
  return (
    <Wrapper onClick={() => callback()}>
      <ContentWrapper>
        {!isCompanyBox && (isEmpty ? <EmptyIcon /> : isChecked ? <CheckedIcon /> : <NotCheckedIcon />)}
        <div>
          <Subparagraph type={'subparagraph'}>{topDescription}</Subparagraph>
          <Name>{name}</Name>
          <Subparagraph>{bottomDescription}</Subparagraph>
        </div>
      </ContentWrapper>
      {value ? <ValueParagraph>{value}</ValueParagraph> : editCallback ? <EditIcon onClick={editCallback} /> : <ArrowButton />}
    </Wrapper>
  );
};

export default ListBox;
