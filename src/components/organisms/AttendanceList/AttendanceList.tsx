import React from 'react';

import ListBox from '../../molecules/ListBox/ListBox';

import { AttendanceInterface } from '../../../types/modelsTypes';
import { isEmpty } from '../../../utils/functions';
import { StyledWrapper, DateHeading } from './AttendanceList.styles';

interface Props {
  singleDayAttendance: AttendanceInterface[];
  setSelectedAttendance?: React.Dispatch<React.SetStateAction<AttendanceInterface | null>>;
  setAttendanceOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AttendanceList: React.FC<Props> = ({ singleDayAttendance, setSelectedAttendance, setAttendanceOpen }) => {
  return (
    <StyledWrapper>
      <DateHeading>{new Date().toLocaleDateString()}</DateHeading>
      {singleDayAttendance.map((attendance, index: number) => (
        <ListBox
          key={attendance._id}
          name={`${attendance.user.name} ${attendance.user.lastName}`}
          topDescription={new Date().toLocaleDateString()}
          bottomDescription={attendance.user.email}
          isCompanyBox={false}
          isEmpty={isEmpty(attendance.attendance)}
          isChecked={!isEmpty(attendance.attendance) && attendance.attendance?.wasPresent}
          callback={() => {
            !!setSelectedAttendance && setSelectedAttendance(attendance);
            !!setAttendanceOpen && setAttendanceOpen(true);
          }}
          value={attendance.attendance?.wasPresent ? `${attendance.attendance.hours} h` : undefined}
        />
      ))}
    </StyledWrapper>
  );
};

export default AttendanceList;
