import React from 'react';
import styled from 'styled-components';
import AttendanceBox, { AttendanceBoxProps } from '../../molecules/AttendanceBox/AttendanceBox';
import { AttendanceInterface } from '../../../types/modelsTypes';
import { isEmpty } from '../../../utils/functions';
import ListBox from '../../molecules/ListBox/ListBox';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 600px;
  background-color: ${({ theme }) => theme.colors.dark};
  border-radius: 30px;
  overflow: hidden;

  ${({ theme }) => theme.mq.hdReady} {
    width: 100%;
    height: 100%;
    grid-area: attendance;
    align-self: center;
  }
`;

interface Props {
  singleDayAttendance: AttendanceInterface[];
}

const AttendanceList: React.FC<Props> = ({ singleDayAttendance }) => {
  return (
    <StyledWrapper>
      <p>{new Date().toLocaleDateString()}</p>
      {singleDayAttendance.map((attendance, index: number) => (
        <AttendanceBox
          key={index}
          name={`${attendance.user.name} ${attendance.user.lastName}`}
          date={attendance.attendance?.date && new Date(attendance.attendance?.date)}
          bottomDescription={attendance.user.email}
          callback={() => console.log('attendance clicked')}
          isEmpty={isEmpty(attendance.attendance)}
          isChecked={!isEmpty(attendance.attendance) && attendance.attendance?.wasPresent}
          hours={attendance.attendance?.hours}
        />
      ))}
    </StyledWrapper>
  );
};

export default AttendanceList;
