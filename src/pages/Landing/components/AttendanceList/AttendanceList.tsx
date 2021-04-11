import React from 'react';

import { ListBox, Spinner } from 'components';
import { isEmpty } from 'utils/functions';
import { fetchDayAttendance } from 'api';
import { useFetch, useShowContent, useQuery } from 'components/hooks';
import { AttendanceModel } from 'types';

import { StyledWrapper, DateHeading } from './AttendanceList.styles';
import { SpinnerWrapper, Paragraph } from 'styles';

interface Props {
  handleAttendanceOpen: () => void;
  setSelectedAttendance?: React.Dispatch<React.SetStateAction<AttendanceModel | null>>;
}

const AttendanceList: React.FC<Props> = ({ setSelectedAttendance, handleAttendanceOpen }) => {
  const { query, setQuery } = useQuery();
  const currentLocalDate = new Date().toLocaleDateString();

  const dayAttendance = useFetch<typeof fetchDayAttendance>(fetchDayAttendance(new Date()));
  const { showContent, showLoader, showNoContent, showError } = useShowContent(dayAttendance);
  const { payload: attendance } = dayAttendance;

  const listBoxCallback = (attendance: AttendanceModel) => () => {
    setQuery('attendance', attendance._id);
    !!setSelectedAttendance && setSelectedAttendance(attendance);
    handleAttendanceOpen();
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
            name={`${attendance.userId.name} ${attendance.userId.lastName}`}
            topDescription={currentLocalDate}
            bottomDescription={attendance.userId.email}
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
