import React from 'react';
import { useSelector } from 'react-redux';

import WeekAttendanceComponent from './components/WeekAttendanceComponent/WeekAttendanceComponent';
import { useFetch, useShowContent, useQuery } from 'components/hooks';
import { fetchSingleAttendance } from 'api';
import { Spinner } from 'components';
import { AppState } from 'store/store';

import { Paragraph, SpinnerWrapper } from 'styles';
import { Wrapper, HeaderWrapper, EmployeeInfoBox, Title } from 'styles/contentStyles';

const AttendanceInfo: React.FC = () => {
  const { weekAttendance } = useSelector((state: AppState) => state.attendance.weekAttendanceData);
  const { query } = useQuery();
  console.log(query.attendance !== 'none');

  const attendanceData = useFetch<typeof fetchSingleAttendance>(fetchSingleAttendance(query.attendance), {
    dependencies: [query.attendance],
    conditions: !!query.attendance && query.attendance !== 'none'
  });
  const { showContent, showLoader, showNoContent, showError } = useShowContent(attendanceData);
  const { payload: attendance } = attendanceData;

  const showUpdate = query.attendance === 'none';

  console.log(attendance);

  return (
    <Wrapper>
      {showLoader && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
      {showNoContent && <Paragraph>Brak danych</Paragraph>}
      {showError && <Paragraph>Błąd podczas ładowania</Paragraph>}
      {showContent && attendance && (
        <>
          <Paragraph>Data urodzenia: {new Date(attendance.userId.dateOfBirth).toLocaleDateString()}</Paragraph>
          <HeaderWrapper>
            <Title>
              {attendance.userId.name} {attendance.userId.lastName}
            </Title>
          </HeaderWrapper>
          <EmployeeInfoBox>
            <Paragraph type={'subparagraph'}>Email: {attendance.userId.email}</Paragraph>
            <Paragraph type={'subparagraph'}>{attendance.userId.phoneNumber}</Paragraph>
          </EmployeeInfoBox>
          {weekAttendance && <WeekAttendanceComponent weekAttendance={weekAttendance} userId={attendance.userId._id} />}
        </>
      )}
      {showUpdate && attendance && <p>Update attendance of {attendance.userId.name} {attendance.userId.lastName}</p>}
    </Wrapper>
  );
};

export default AttendanceInfo;
