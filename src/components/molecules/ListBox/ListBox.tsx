import React from 'react';
import { ColorTheme, ContentWrapper, Name, Subparagraph, Wrapper } from './ListBox.styles';
import ArrowButton from '../../atoms/ArrowButton/ArrowButton';
import { CheckedIcon, EmptyIcon, NotCheckedIcon } from '../../../styles/iconStyles';

interface Props {
  name: string;
  date: string | Date;
  bottomDescription: string;
  callback: () => void;
  isAttendance?: boolean;
}

interface EmptyIconInterface extends Props {
  isEmpty: boolean;
  isChecked?: never;
}

interface CheckedIconInterface extends Props {
  isChecked: boolean;
  isEmpty?: never;
}

type ConnectedProps = EmptyIconInterface | CheckedIconInterface;

const ListBox: React.FC<ConnectedProps> = ({ name, date, bottomDescription, callback, isAttendance, isEmpty, isChecked }) => {
  const colorTheme: ColorTheme = isAttendance ? ColorTheme.Light : ColorTheme.Dark;
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
      <ArrowButton onClick={() => callback()} />
    </Wrapper>
  );
};

export default ListBox;
