import React from 'react';

import { ListBox, Spinner } from 'components';

import { AttendanceInterface } from 'types/modelsTypes';
import { isEmpty } from 'utils/functions';
import { useFetch, useShowContent, useQuery } from 'components/hooks';
import { StyledWrapper, DateHeading } from './AttendanceList.styles';
import { fetchSingleDayAttendance } from 'api/attendance/api.attendance';

import { SpinnerWrapper, Paragraph } from 'styles';

interface Props {
  setSelectedAttendance?: React.Dispatch<React.SetStateAction<AttendanceInterface | null>>;
  setAttendanceOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AttendanceList: React.FC<Props> = ({ setSelectedAttendance, setAttendanceOpen }) => {
  const {query, setQuery} = useQuery();
  const currentLocalDate = new Date().toLocaleDateString();

  const dayAttendance = useFetch<typeof fetchSingleDayAttendance>(fetchSingleDayAttendance(new Date()));
  const { showContent, showLoader, showNoContent, showError } = useShowContent(dayAttendance);
  const { payload: attendance } = dayAttendance;

  const listBoxCallback = (attendance: AttendanceInterface) => () => {

    !!setSelectedAttendance && setSelectedAttendance(attendance);
    !!setAttendanceOpen && setAttendanceOpen(true);
  };

  return (
    <StyledWrapper>
      <DateHeading>{currentLocalDate}</DateHeading>
      {showLoader && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
      {showNoContent && <Paragraph>Brak danych</Paragraph>}
      {showError && <Paragraph>Błąd ładowania</Paragraph>}
      {showContent &&
        attendance &&
        attendance.map((attendance) => (
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
