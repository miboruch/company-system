import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';

import AttendanceInfo from './components/AttendanceInfo/AttendanceInfo';
import AttendancePopup from './components/AttendancePopup/AttendancePopup';
import { ListBox, Spinner, GridWrapper, ContentTemplate } from 'components';
import { AttendanceInterface } from 'types/modelsTypes';
import { AppState, useAppDispatch } from 'store/store';
import { listAnimation } from 'animations/animations';
import { selectAttendance } from 'ducks/attendance/attendance-toggle/attendance-toggle-creators';
import { setAttendanceInfoOpen, setDate } from 'ducks/attendance/attendance-toggle/attendance-toggle';
import { isEmpty } from 'utils/functions';
import { getSingleDayAttendance } from 'ducks/attendance/attendance-data/attendance-data-creators';

import { ListWrapper, List, DatePickerWrapper } from './AttendancePageContent.styles';
import { StyledLabel, SpinnerWrapper } from 'styles';

const AttendancePageContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { singleDayAttendance, isAttendanceLoading } = useSelector((state: AppState) => state.attendance.attendanceData);
  const { isAttendanceInfoOpen, attendanceDate } = useSelector((state: AppState) => state.attendance.attendanceToggle);

  const listRef = useRef<HTMLDivElement | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceInterface | null>(null);
  const [isAttendanceOpen, setAttendanceOpen] = useState<boolean>(false);

  const filterByUserName = (filterText: string, dayAttendance: AttendanceInterface[]): AttendanceInterface[] => {
    return dayAttendance.filter((attendance) =>
      `${attendance.user.name} ${attendance.user.lastName}`.toLowerCase().includes(filterText.toLowerCase())
    );
  };

  const handleAttendanceInfoClose = () => dispatch(setAttendanceInfoOpen(false));
  const handleSelectAttendance = (attendance: AttendanceInterface) => () => dispatch(selectAttendance(attendance));
  const editAttendanceCallback = (attendance: AttendanceInterface) => () => {
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
    <GridWrapper mobilePadding={false} pageName={'Lista obecności'} setFilterText={setFilterText}>
      {isAttendanceLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <>
          <ListWrapper>
            <DatePickerWrapper>
              <StyledLabel>Data</StyledLabel>
              <DatePicker
                selected={new Date(attendanceDate)}
                onChange={(date) => date && date instanceof Date && dispatch(setDate(date))}
                dateFormat={'dd/MM/yyyy'}
              />
            </DatePickerWrapper>
            <List ref={listRef}>
              {filterByUserName(filterText, singleDayAttendance).map((attendance) => (
                <ListBox
                  key={attendance._id}
                  name={`${attendance.user.name} ${attendance.user.lastName}`}
                  topDescription={new Date(attendanceDate).toLocaleDateString()}
                  bottomDescription={attendance.user.email}
                  isCompanyBox={false}
                  isEmpty={isEmpty(attendance.attendance)}
                  isChecked={!isEmpty(attendance.attendance) && attendance.attendance?.wasPresent}
                  editCallback={editAttendanceCallback(attendance)}
                  callback={handleSelectAttendance(attendance)}
                />
              ))}
            </List>
          </ListWrapper>
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
  );
};

export default AttendancePageContent;
