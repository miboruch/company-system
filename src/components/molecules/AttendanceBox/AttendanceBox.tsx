import React from 'react';
import { Wrapper, ContentWrapper, Name, Subparagraph } from './AttendanceBox.styles';
import { CheckedIcon, NotCheckedIcon } from '../../../styles/iconStyles';

export interface AttendanceBoxProps {
  name: string;
  date: string | Date;
  bottomDescription: string;
  hours?: number | string;
  wasPresent: boolean;
  callback: () => void;
}

const AttendanceBox: React.FC<AttendanceBoxProps> = ({ name, date, bottomDescription, wasPresent, hours, callback }) => {
  return (
    <Wrapper onClick={() => callback()}>
      <ContentWrapper>
        {wasPresent ? <CheckedIcon /> : <NotCheckedIcon />}
        <div>
          <Subparagraph>{date}</Subparagraph>
          <Name>{name}</Name>
          <Subparagraph>{bottomDescription}</Subparagraph>
        </div>
      </ContentWrapper>
      {hours ? <Name>{hours}h</Name> : <Name>0h</Name>}
    </Wrapper>
  );
};

export default AttendanceBox;
