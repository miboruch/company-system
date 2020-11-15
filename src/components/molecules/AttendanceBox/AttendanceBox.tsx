import React from 'react';
import { StyledWrapper, StyledName } from './AttendanceBox.styles';
import { ContentWrapper, Subparagraph } from '../ListBox/ListBox.styles';
import { CheckedIcon, EmptyIcon, NotCheckedIcon } from '../../../styles/iconStyles';

export interface AttendanceBoxProps {
  name: string;
  date?: Date;
  bottomDescription: string;
  hours?: number;
  isChecked?: boolean;
  isEmpty?: boolean;
  callback: () => void;
}

const AttendanceBox: React.FC<AttendanceBoxProps> = ({ name, date, bottomDescription, isChecked, isEmpty, hours, callback }) => {
  return (
    <StyledWrapper onClick={() => callback()}>
      <ContentWrapper>
        {isEmpty ? <EmptyIcon /> : isChecked ? <CheckedIcon /> : <NotCheckedIcon />}
        <div>
          <Subparagraph>{date && date.toLocaleDateString()}</Subparagraph>
          <StyledName>{name}</StyledName>
          <Subparagraph>{bottomDescription}</Subparagraph>
        </div>
      </ContentWrapper>
      {hours ? <StyledName>{hours}h</StyledName> : <StyledName>0h</StyledName>}
    </StyledWrapper>
  );
};

export default AttendanceBox;
