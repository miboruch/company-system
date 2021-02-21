import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ArrowButton } from 'components';
import { WeekAttendance } from 'types/modelsTypes';
import { AppState, useAppDispatch } from 'store/store';
import { Direction } from 'types/globalTypes';
import { compareDates } from 'utils/functions';
import { getWeekAttendance } from 'ducks/attendance/week-attendance-data/week-attendance-data-creators';
import { months, weekDays } from 'utils/config';
import { Paragraph } from 'styles/typography/typography';
import {
  MainWrapper,
  Header,
  StyledWrapper,
  SingleAttendanceWrapper,
  WeekDayParagraph,
  DateParagraph,
  StyledEmptyIcon,
  StyledNotCheckedIcon
} from './WeekAttendanceComponent.styles';

interface Props {
  weekAttendance: WeekAttendance[];
}

const WeekAttendanceComponent: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { weekAttendance } = useSelector((state: AppState) => state.attendance.weekAttendanceData);
  const [weekCounter, setWeekCounter] = useState<number>(0);

  const increaseWeek = () => setWeekCounter((prevCounter) => prevCounter + 1);
  const decreaseWeek = () => setWeekCounter((prevCounter) => prevCounter - 1);

  useEffect(() => {
    dispatch(getWeekAttendance(weekCounter));
  }, [weekCounter]);

  return (
    <MainWrapper>
      {weekAttendance && weekAttendance.length > 0 && (
        <>
          <Header>
            <ArrowButton direction={Direction.Left} onClick={decreaseWeek} />
            <Paragraph type={'main'} style={{ marginBottom: '0' }}>
              {months[new Date(weekAttendance[3].date).getMonth()]}
            </Paragraph>
            <ArrowButton direction={Direction.Right} onClick={increaseWeek} />
          </Header>
          <StyledWrapper>
            {weekAttendance.map((attendance, index) => {
              return (
                <SingleAttendanceWrapper isCurrentDay={compareDates(new Date(attendance.date), new Date())} key={index}>
                  <div>
                    <DateParagraph>{new Date(attendance.date).toLocaleDateString()}</DateParagraph>
                    <WeekDayParagraph>{weekDays[new Date(attendance.date).getDay()]}</WeekDayParagraph>
                  </div>
                  {attendance.wasPresent === null ? (
                    <StyledEmptyIcon />
                  ) : attendance.wasPresent ? (
                    <Paragraph type={'main'} style={{ marginBottom: '0' }}>
                      {attendance.hours}
                    </Paragraph>
                  ) : (
                    <StyledNotCheckedIcon />
                  )}
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
