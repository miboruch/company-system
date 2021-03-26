import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import gsap from 'gsap';

import { ListBox } from 'components';
import { useFetch, useShowContent, useQuery } from 'components/hooks';
import { isEmpty } from 'utils/functions';
import { listAnimation } from 'animations/animations';
import { fetchDayAttendance } from 'api';
import { AttendanceModel } from 'types';

import { DatePickerWrapper, List, ListWrapper } from 'pages/Attendance/Attendance.styles';
import { Paragraph, StyledLabel } from 'styles';

interface Props {
  filterText: string;
  editAttendanceCallback: (attendance: AttendanceModel) => () => void;
  date: Date;
  setDate: (date: Date) => void;
}

const AttendanceList: React.FC<Props> = ({ filterText, editAttendanceCallback, date, setDate }) => {
  const { setQuery } = useQuery();

  const listRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const attendanceData = useFetch<typeof fetchDayAttendance>(fetchDayAttendance(date), { dependencies: [date] });
  const { showContent, showLoader, showNoContent, showError } = useShowContent(attendanceData);
  const { payload: attendance } = attendanceData;

  const filterByUserName = (attendance: AttendanceModel) =>
    `${attendance.user.name} ${attendance.user.lastName}`.toLowerCase().includes(filterText.toLowerCase());
  const handleSelectAttendance = (id: string) => () => setQuery('attendance', id);

  useEffect(() => {
    showContent && listAnimation(tl, listRef);
  }, [showContent]);

  return (
    <ListWrapper>
      <DatePickerWrapper>
        <StyledLabel>Data</StyledLabel>
        <DatePicker
          selected={new Date(date)}
          onChange={(date) => date && date instanceof Date && setDate(date)}
          dateFormat={'dd/MM/yyyy'}
        />
      </DatePickerWrapper>
      <List ref={listRef}>
        {showLoader && <Paragraph>Ładowanie</Paragraph>}
        {showNoContent && <Paragraph>Brak danych</Paragraph>}
        {showError && <Paragraph>Problem z wyświetleniem danych</Paragraph>}
        {showContent &&
          attendance &&
          attendance
            .filter(filterByUserName)
            .map((attendance) => (
              <ListBox
                key={attendance._id}
                name={`${attendance.user.name} ${attendance.user.lastName}`}
                topDescription={new Date(date).toLocaleDateString()}
                bottomDescription={attendance.user.email}
                isCompanyBox={false}
                isEmpty={isEmpty(attendance.attendance)}
                isChecked={!isEmpty(attendance.attendance) && attendance.attendance?.wasPresent}
                editCallback={editAttendanceCallback(attendance)}
                callback={handleSelectAttendance(attendance._id)}
              />
            ))}
      </List>
    </ListWrapper>
  );
};

export default AttendanceList;
