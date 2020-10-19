import React from 'react';
import { ColorTheme, ContentWrapper, Name, Subparagraph, Wrapper } from './ListBox.styles';
import ArrowButton from '../../atoms/ArrowButton/ArrowButton';
import { CheckedIcon, EmptyIcon, NotCheckedIcon } from '../../../styles/iconStyles';

interface Props {
  name: string;
  date: string | Date;
  bottomDescription: string;
  callback: () => void;
  hours?: number | string;
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

const ListBox: React.FC<ListBoxProps> = ({ name, date, bottomDescription, callback, hours, isEmpty, isChecked }) => {
  const colorTheme: ColorTheme = !!hours || hours === 0 ? ColorTheme.Light : ColorTheme.Dark;
  return (
    <Wrapper colorTheme={colorTheme}>
      <ContentWrapper>
        {isEmpty ? <EmptyIcon /> : isChecked ? <CheckedIcon /> : <NotCheckedIcon />}
        <div>
          <Subparagraph colorTheme={colorTheme}>{date}</Subparagraph>
          <Name colorTheme={colorTheme}>{name}</Name>
          <Subparagraph colorTheme={colorTheme}>{bottomDescription}</Subparagraph>
        </div>
      </ContentWrapper>
      {hours || hours === 0 ? <Name colorTheme={colorTheme}>{hours}h</Name> : <ArrowButton onClick={() => callback()} />}
    </Wrapper>
  );
};

export default ListBox;
