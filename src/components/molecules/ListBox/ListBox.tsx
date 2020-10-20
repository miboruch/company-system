import React from 'react';
import { ContentWrapper, Name, Subparagraph, Wrapper } from './ListBox.styles';
import ArrowButton from '../../atoms/ArrowButton/ArrowButton';
import { CheckedIcon, EmptyIcon, NotCheckedIcon } from '../../../styles/iconStyles';

interface Props {
  name: string;
  date: string | Date;
  bottomDescription: string;
  callback: () => void;
}

interface EmptyIconInterface extends Props {
  isEmpty: boolean;
  isChecked?: undefined;
}

interface CheckedIconInterface extends Props {
  isChecked: boolean;
  isEmpty?: undefined;
}

export type ListBoxProps = EmptyIconInterface | CheckedIconInterface;

const ListBox: React.FC<ListBoxProps> = ({ name, date, bottomDescription, callback, isEmpty, isChecked }) => {
  return (
    <Wrapper>
      <ContentWrapper>
        {isEmpty ? <EmptyIcon /> : isChecked ? <CheckedIcon /> : <NotCheckedIcon />}
        <div>
          <Subparagraph>{date}</Subparagraph>
          <Name>{name}</Name>
          <Subparagraph>{bottomDescription}</Subparagraph>
        </div>
      </ContentWrapper>
      <ArrowButton onClick={() => callback()} />
    </Wrapper>
  );
};

export default ListBox;
