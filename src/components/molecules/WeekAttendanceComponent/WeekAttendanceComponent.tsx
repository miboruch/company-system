import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { WeekAttendance } from '../../../types/modelsTypes';
import { compareDates } from '../../../utils/functions';
import ArrowButton from '../../atoms/ArrowButton/ArrowButton';
import { Direction } from '../../../types/globalTypes';
import { getWeekAttendance } from '../../../actions/attendanceActions';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';
import { MainWrapper, Header, StyledWrapper, SingleAttendanceWrapper, DateParagraph, StyledCheckedIcon, StyledEmptyIcon, StyledNotCheckedIcon } from './WeekAttendanceComponent.styles';
import { months } from '../../../utils/config';

interface Props {
  weekAttendance: WeekAttendance[];
}

type ConnectedProps = Props & LinkDispatchProps;

const WeekAttendanceComponent: React.FC<ConnectedProps> = ({ weekAttendance, getWeekAttendance }) => {
  const [weekCounter, setWeekCounter] = useState<number>(0);

  const increaseWeek = (): void => {
    setWeekCounter((prevCounter) => prevCounter + 1);
  };

  const decreaseWeek = (): void => {
    setWeekCounter((prevCounter) => prevCounter - 1);
  };

  useEffect(() => {
    getWeekAttendance(weekCounter);
  }, [weekCounter]);

  return (
    <MainWrapper>
      <Header>
        <ArrowButton direction={Direction.Left} onClick={() => decreaseWeek()} />
        <p>{months[new Date(weekAttendance[3].date).getMonth()]}</p>
        <ArrowButton direction={Direction.Right} onClick={() => increaseWeek()} />
      </Header>
      <StyledWrapper>
        {weekAttendance.map((attendance, index) => (
          <SingleAttendanceWrapper isCurrentDay={compareDates(new Date(attendance.date), new Date())} key={index} onClick={() => console.log(attendance)}>
            <DateParagraph>{new Date(attendance.date).toLocaleDateString()}</DateParagraph>
            {attendance.wasPresent === null ? <StyledEmptyIcon /> : attendance.wasPresent ? <StyledCheckedIcon /> : <StyledNotCheckedIcon />}
            {attendance.wasPresent && <p>{attendance.hours}</p>}
          </SingleAttendanceWrapper>
        ))}
      </StyledWrapper>
    </MainWrapper>
  );
};

interface LinkDispatchProps {
  getWeekAttendance: (week: number) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppTypes>): LinkDispatchProps => {
  return {
    getWeekAttendance: bindActionCreators(getWeekAttendance, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(WeekAttendanceComponent);
