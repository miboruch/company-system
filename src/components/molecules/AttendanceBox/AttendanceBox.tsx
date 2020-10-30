import React from 'react';
import { Wrapper, ContentWrapper, Name, Subparagraph } from './AttendanceBox.styles';
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
    <Wrapper onClick={() => callback()}>
      <ContentWrapper>
        {isEmpty ? <EmptyIcon /> : isChecked ? <CheckedIcon /> : <NotCheckedIcon />}
        <div>
          <Subparagraph>{date && date.toLocaleDateString()}</Subparagraph>
          <Name>{name}</Name>
          <Subparagraph>{bottomDescription}</Subparagraph>
        </div>
      </ContentWrapper>
      {hours ? <Name>{hours}h</Name> : <Name>0h</Name>}
    </Wrapper>
  );
};

export default AttendanceBox;
