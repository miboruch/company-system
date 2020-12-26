import React from 'react';

import ListBox from 'components/molecules/ListBox/ListBox';

import { AttendanceInterface } from 'types/modelsTypes';
import { isEmpty } from 'utils/functions';
import { StyledWrapper, DateHeading } from './AttendanceList.styles';

interface Props {
  singleDayAttendance: AttendanceInterface[];
  setSelectedAttendance?: React.Dispatch<React.SetStateAction<AttendanceInterface | null>>;
  setAttendanceOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AttendanceList: React.FC<Props> = ({ singleDayAttendance, setSelectedAttendance, setAttendanceOpen }) => {
  const currentLocalDate = new Date().toLocaleDateString();

  const listBoxCallback = (attendance: AttendanceInterface) => () => {
    !!setSelectedAttendance && setSelectedAttendance(attendance);
    !!setAttendanceOpen && setAttendanceOpen(true);
  };

  return (
    <StyledWrapper>
      <DateHeading>{currentLocalDate}</DateHeading>
      {singleDayAttendance.map((attendance) => (
        <ListBox
          key={attendance._id}
          name={`${attendance.user.name} ${attendance.user.lastName}`}
          topDescription={currentLocalDate}
          bottomDescription={attendance.user.email}
          isCompanyBox={false}
          isEmpty={isEmpty(attendance.attendance)}
          isChecked={!isEmpty(attendance.attendance) && attendance.attendance?.wasPresent}
          callback={listBoxCallback(attendance)}
          value={attendance.attendance?.wasPresent ? `${attendance.attendance.hours} h` : undefined}
        />
      ))}
    </StyledWrapper>
  );
};

export default AttendanceList;
