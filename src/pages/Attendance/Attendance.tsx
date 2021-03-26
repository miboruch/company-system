import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';

import { MenuTemplate, ContentTemplate, GridWrapper, ListBox, Spinner } from 'components';

import { setAttendanceInfoOpen, setDate } from 'ducks/attendance/attendance-toggle/attendance-toggle';
import { isEmpty } from 'utils/functions';
import AttendanceInfo from './components/AttendanceInfo/AttendanceInfo';
import AttendancePopup from './components/AttendancePopup/AttendancePopup';
import { AppState, useAppDispatch } from 'store/store';

import { AttendanceInterface } from 'types/modelsTypes';
import { selectAttendance } from 'ducks/attendance/attendance-toggle/attendance-toggle-creators';
import { listAnimation } from 'animations/animations';

import { getSingleDayAttendance } from 'ducks/attendance/attendance-data/attendance-data-creators';
import { SpinnerWrapper, StyledLabel } from 'styles';
import { DatePickerWrapper, List, ListWrapper } from './Attendance.styles';
import AttendanceList from 'pages/Attendance/components/AttendanceList/AttendanceList';
import { AttendanceModel } from 'types';

const Attendance: React.FC = () => {
  const dispatch = useAppDispatch();
  const { singleDayAttendance, isAttendanceLoading } = useSelector((state: AppState) => state.attendance.attendanceData);
  const { isAttendanceInfoOpen, attendanceDate } = useSelector((state: AppState) => state.attendance.attendanceToggle);

  const [filterText, setFilterText] = useState<string>('');
  const listRef = useRef<HTMLDivElement | null>(null);
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceModel | null>(null);
  const [isAttendanceOpen, setAttendanceOpen] = useState<boolean>(false);

  const handleAttendanceInfoClose = () => dispatch(setAttendanceInfoOpen(false));

  const editAttendanceCallback = (attendance: AttendanceModel) => () => {
    setSelectedAttendance(attendance);
    setAttendanceOpen(true);
  };

  useEffect(() => {
    listAnimation(tl, listRef, isAttendanceLoading);
  }, [isAttendanceLoading]);

  useEffect(() => {
    dispatch(getSingleDayAttendance());
  }, [attendanceDate]);

  const handleAttendanceClose = () => setAttendanceOpen(false);

  return (
    <MenuTemplate>
      <GridWrapper mobilePadding={false} pageName={'Lista obecności'} setFilterText={setFilterText}>
        {isAttendanceLoading ? (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        ) : (
          <>
            <AttendanceList filterText={filterText} editAttendanceCallback={editAttendanceCallback} />
            <ContentTemplate isOpen={isAttendanceInfoOpen} close={handleAttendanceInfoClose}>
              <AttendanceInfo />
            </ContentTemplate>
          </>
        )}
        <AttendancePopup
          attendance={selectedAttendance}
          isOpen={isAttendanceOpen}
          handleClose={handleAttendanceClose}
          date={new Date(attendanceDate)}
        />
      </GridWrapper>
    </MenuTemplate>
  );
};

export default Attendance;
