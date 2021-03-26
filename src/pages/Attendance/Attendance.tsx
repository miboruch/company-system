import React, { useState } from 'react';

import AttendanceInfo from './components/AttendanceInfo/AttendanceInfo';
import AttendancePopup from './components/AttendancePopup/AttendancePopup';
import AttendanceList from './components/AttendanceList/AttendanceList';
import { MenuTemplate, ContentTemplate, GridWrapper } from 'components';
import { useQuery } from 'components/hooks';
import { AttendanceModel } from 'types';

const Attendance: React.FC = () => {
  const { query, removeQuery } = useQuery();
  const [date, setDate] = useState<Date>(new Date());

  const [filterText, setFilterText] = useState<string>('');

  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceModel | null>(null);
  const [isAttendanceOpen, setAttendanceOpen] = useState<boolean>(false);

  const editAttendanceCallback = (attendance: AttendanceModel) => () => {
    setSelectedAttendance(attendance);
    setAttendanceOpen(true);
  };

  const handleAttendanceClose = () => setAttendanceOpen(false);
  const removeAttendanceQuery = () => removeQuery('attendance');

  return (
    <MenuTemplate>
      <GridWrapper mobilePadding={false} pageName={'Lista obecności'} setFilterText={setFilterText}>
        <AttendanceList filterText={filterText} editAttendanceCallback={editAttendanceCallback} date={date} setDate={setDate} />
        <ContentTemplate isOpen={!!query.attendance} close={removeAttendanceQuery}>
          <AttendanceInfo />
        </ContentTemplate>
        <AttendancePopup
          attendance={selectedAttendance}
          isOpen={isAttendanceOpen}
          handleClose={handleAttendanceClose}
          date={new Date(date)}
        />
      </GridWrapper>
    </MenuTemplate>
  );
};

export default Attendance;
