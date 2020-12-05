import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import DatePicker from 'react-datepicker';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { AttendanceInterface } from '../../../types/modelsTypes';
import { listAnimation } from '../../../animations/animations';
import { AppState, useAppDispatch } from '../../../store/store';
import { getSingleDayAttendance } from '../../../ducks/attendance/attendance-data/attendance-data-creators';
import { selectAttendance } from '../../../ducks/attendance/attendance-toggle/attendance-toggle-creators';
import { setAttendanceInfoOpen, setDate } from '../../../ducks/attendance/attendance-toggle/attendance-toggle';
import { StyledLabel } from '../../../styles/shared';
import ListBox from '../../molecules/ListBox/ListBox';
import styled from 'styled-components';
import { isEmpty } from '../../../utils/functions';
import ContentTemplate from '../../templates/ContentTemplate/ContentTemplate';
import AttendanceInfo from '../AttendanceInfo/AttendanceInfo';
import AttendancePopup from '../../molecules/AttendancePopup/AttendancePopup';
import { SpinnerWrapper } from '../../../styles/shared';
import Spinner from '../../atoms/Spinner/Spinner';

const ListWrapper = styled.section`
  width: 100%;
  height: 100%;

  ${({ theme }) => theme.mq.hdReady} {
    background-color: #fff;
    grid-area: list;
  }
`;

const List = styled.div`
  width: 100%;
  height: 100%;
`;

const DatePickerWrapper = styled.div`
  width: 70%;
  padding-left: 2rem;

  ${({ theme }) => theme.mq.standard} {
    width: 100%;
    padding-left: 0;
  }
`;

const AttendancePageContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { token } = useSelector((state: AppState) => state.auth.tokens);
  const { singleDayAttendance, isAttendanceLoading } = useSelector((state: AppState) => state.attendance.attendanceData);
  const { isAttendanceInfoOpen, attendanceDate } = useSelector((state: AppState) => state.attendance.attendanceToggle);

  const listRef = useRef<HTMLDivElement | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceInterface | null>(null);
  const [isAttendanceOpen, setAttendanceOpen] = useState<boolean>(false);

  const filterByUserName = (filterText: string, dayAttendance: AttendanceInterface[]): AttendanceInterface[] => {
    return dayAttendance.filter((attendance) => `${attendance.user.name} ${attendance.user.lastName}`.toLowerCase().includes(filterText.toLowerCase()));
  };

  useEffect(() => {
    listAnimation(tl, listRef, isAttendanceLoading);
  }, [isAttendanceLoading]);

  useEffect(() => {
    dispatch(getSingleDayAttendance());
  }, [attendanceDate]);

  return (
    <GridWrapper mobilePadding={false} pageName={'Lista obecności'} setFilterText={setFilterText}>
      {isAttendanceLoading ? (
        <SpinnerWrapper>
          <Spinner />{' '}
        </SpinnerWrapper>
      ) : (
        <>
          <ListWrapper>
            <DatePickerWrapper>
              <StyledLabel>Data</StyledLabel>
              <DatePicker selected={new Date(attendanceDate)} onChange={(date) => date && date instanceof Date && dispatch(setDate(date))} dateFormat={'dd/MM/yyyy'} />
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
                  editCallback={() => {
                    setSelectedAttendance(attendance);
                    setAttendanceOpen(true);
                  }}
                  callback={() => dispatch(selectAttendance(attendance))}
                />
              ))}
            </List>
          </ListWrapper>
          <ContentTemplate isOpen={isAttendanceInfoOpen} close={() => dispatch(setAttendanceInfoOpen(false))}>
            <AttendanceInfo />
          </ContentTemplate>
        </>
      )}
      <AttendancePopup attendance={selectedAttendance} isOpen={isAttendanceOpen} setOpen={setAttendanceOpen} date={new Date(attendanceDate)} />
    </GridWrapper>
  );
};

export default AttendancePageContent;
