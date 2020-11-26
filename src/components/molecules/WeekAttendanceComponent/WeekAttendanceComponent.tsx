import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ArrowButton from '../../atoms/ArrowButton/ArrowButton';
import { Direction } from '../../../types/globalTypes';
import { WeekAttendance } from '../../../types/modelsTypes';
import { compareDates } from '../../../utils/functions';
import { getWeekAttendance } from '../../../ducks/attendance/week-attendance-data/week-attendance-data-creators';
import {
  MainWrapper,
  Header,
  StyledWrapper,
  SingleAttendanceWrapper,
  WeekDayParagraph,
  DateParagraph,
  StyledCheckedIcon,
  StyledEmptyIcon,
  StyledNotCheckedIcon
} from './WeekAttendanceComponent.styles';
import { months, weekDays } from '../../../utils/config';
import { AppState, useAppDispatch } from '../../../store/test-store';

interface Props {
  weekAttendance: WeekAttendance[];
}

const WeekAttendanceComponent: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { weekAttendance } = useSelector((state: AppState) => state.attendance.weekAttendanceData);
  const [weekCounter, setWeekCounter] = useState<number>(0);

  const increaseWeek = (): void => {
    setWeekCounter((prevCounter) => prevCounter + 1);
  };

  const decreaseWeek = (): void => {
    setWeekCounter((prevCounter) => prevCounter - 1);
  };

  useEffect(() => {
    dispatch(getWeekAttendance(weekCounter));
  }, [weekCounter]);

  return (
    <MainWrapper>
      {weekAttendance && weekAttendance.length > 0 && (
        <>
          <Header>
            <ArrowButton direction={Direction.Left} onClick={() => decreaseWeek()} />
            <p>{months[new Date(weekAttendance[3].date).getMonth()]}</p>
            <ArrowButton direction={Direction.Right} onClick={() => increaseWeek()} />
          </Header>
          <StyledWrapper>
            {weekAttendance.map((attendance, index) => {
              return (
                <SingleAttendanceWrapper isCurrentDay={compareDates(new Date(attendance.date), new Date())} key={index} onClick={() => console.log(attendance)}>
                  <DateParagraph>{new Date(attendance.date).toLocaleDateString()}</DateParagraph>
                  <WeekDayParagraph>{weekDays[new Date(attendance.date).getDay()]}</WeekDayParagraph>
                  {attendance.wasPresent === null ? <StyledEmptyIcon /> : attendance.wasPresent ? <StyledCheckedIcon /> : <StyledNotCheckedIcon />}
                  {attendance.wasPresent && <p>{attendance.hours}</p>}
                </SingleAttendanceWrapper>
              );
            })}
          </StyledWrapper>
        </>
      )}
    </MainWrapper>
  );
};

export default WeekAttendanceComponent;
