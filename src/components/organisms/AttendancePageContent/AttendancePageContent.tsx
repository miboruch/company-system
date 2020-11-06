import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import gsap from 'gsap';
import DatePicker from 'react-datepicker';
import GridWrapper from '../../templates/GridWrapper/GridWrapper';
import { AttendanceInterface, IncomeDataInterface } from '../../../types/modelsTypes';
import { listAnimation } from '../../../animations/animations';
import { AppState } from '../../../reducers/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { bindActionCreators } from 'redux';
import { getSingleDayAttendance, selectAttendance, setAttendanceInfoOpen, setDate } from '../../../actions/attendanceActions';
import { StyledLabel } from '../../../styles/shared';
import ListBox from '../../molecules/ListBox/ListBox';
import styled from 'styled-components';
import { isEmpty } from '../../../utils/functions';
import ContentTemplate from '../../templates/ContentTemplate/ContentTemplate';
import AttendanceInfo from '../AttendanceInfo/AttendanceInfo';
import AttendancePopup from '../../molecules/AttendancePopup/AttendancePopup';
import AttendanceList from '../AttendanceList/AttendanceList';
import { getIncomeExpenseInTimePeriod } from '../../../utils/incomeExpenseAPI';

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

interface Props {}

type ConnectedProps = Props & LinkStateProps & LinkDispatchProps;

const AttendancePageContent: React.FC<ConnectedProps> = ({
  token,
  isLoading,
  singleDayAttendance,
  isAttendanceInfoOpen,
  attendanceDate,
  setAttendanceInfoOpen,
  selectAttendance,
  getSingleDayAttendance,
  setDate
}) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [filterText, setFilterText] = useState<string>('');
  const [tl] = useState<GSAPTimeline>(gsap.timeline({ defaults: { ease: 'Power3.inOut' } }));

  const [selectedAttendance, setSelectedAttendance] = useState<AttendanceInterface | null>(null);
  const [isAttendanceOpen, setAttendanceOpen] = useState<boolean>(false);

  const filterByUserName = (filterText: string, dayAttendance: AttendanceInterface[]): AttendanceInterface[] => {
    return dayAttendance.filter((attendance) => `${attendance.user.name} ${attendance.user.lastName}`.toLowerCase().includes(filterText.toLowerCase()));
  };

  useEffect(() => {
    listAnimation(tl, listRef, isLoading);
  }, [isLoading]);

  useEffect(() => {
    getSingleDayAttendance();
  }, [attendanceDate]);

  return (
    <GridWrapper mobilePadding={false} pageName={'Lista obecności'} setFilterText={setFilterText}>
      <>
        <ListWrapper>
          <div>
            <StyledLabel>Data</StyledLabel>
            <DatePicker selected={attendanceDate} onChange={(date) => date && date instanceof Date && setDate(date)} dateFormat={'dd/MM/yyyy'} />
          </div>
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
                callback={() => selectAttendance(attendance)}
              />
            ))}
          </List>
        </ListWrapper>
        <ContentTemplate isOpen={isAttendanceInfoOpen} setOpen={setAttendanceInfoOpen}>
          <AttendanceInfo />
        </ContentTemplate>
      </>
      <AttendancePopup attendance={selectedAttendance} isOpen={isAttendanceOpen} setOpen={setAttendanceOpen} />
    </GridWrapper>
  );
};

interface LinkStateProps {
  token: string | null;
  isLoading: boolean;
  singleDayAttendance: AttendanceInterface[];
  isAttendanceInfoOpen: boolean;
  attendanceDate: Date;
}

interface LinkDispatchProps {
  getSingleDayAttendance: () => void;
  selectAttendance: (attendance: AttendanceInterface) => void;
  setAttendanceInfoOpen: (isOpen: boolean) => void;
  setDate: (date: Date) => void;
}

const mapStateToProps = ({ authenticationReducer: { token }, attendanceReducer: { isLoading, singleDayAttendance, isAttendanceInfoOpen, attendanceDate } }: AppState): LinkStateProps => {
  return { token, isLoading, singleDayAttendance, isAttendanceInfoOpen, attendanceDate };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getSingleDayAttendance: bindActionCreators(getSingleDayAttendance, dispatch),
    selectAttendance: bindActionCreators(selectAttendance, dispatch),
    setAttendanceInfoOpen: bindActionCreators(setAttendanceInfoOpen, dispatch),
    setDate: bindActionCreators(setDate, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendancePageContent);
