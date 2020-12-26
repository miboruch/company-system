import React from 'react';
import { useSelector } from 'react-redux';

import Spinner from '../../atoms/Spinner/Spinner';
import WeekAttendanceComponent from '../../molecules/WeekAttendanceComponent/WeekAttendanceComponent';

import { AppState } from 'store/store';
import { Paragraph } from 'styles/typography/typography';
import { Wrapper, HeaderWrapper, EmployeeInfoBox, Title } from 'styles/contentStyles';
import { SpinnerWrapper } from 'styles/shared';

const AttendanceInfo: React.FC = () => {
  const { weekAttendance, isContentLoading } = useSelector((state: AppState) => state.attendance.weekAttendanceData);
  const { selectedAttendance } = useSelector((state: AppState) => state.attendance.attendanceToggle);
  return (
    <Wrapper>
      {isContentLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        selectedAttendance && (
          <>
            <Paragraph>Data urodzenia: {new Date(selectedAttendance.user.dateOfBirth).toLocaleDateString()}</Paragraph>
            <HeaderWrapper>
              <Title>
                {selectedAttendance.user.name} {selectedAttendance.user.lastName}
              </Title>
            </HeaderWrapper>
            <EmployeeInfoBox>
              <Paragraph type={'subparagraph'}>Email: {selectedAttendance.user.email}</Paragraph>
              <Paragraph type={'subparagraph'}>{selectedAttendance.user.phoneNumber}</Paragraph>
            </EmployeeInfoBox>
            {weekAttendance && <WeekAttendanceComponent weekAttendance={weekAttendance} />}
          </>
        )
      )}
    </Wrapper>
  );
};

export default AttendanceInfo;
