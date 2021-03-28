import React, { useEffect, useState } from 'react';

import { ArrowButton, Spinner } from 'components';
import { useAppDispatch } from 'store/store';
import { compareDates } from 'utils/functions';
import { useFetch, useShowContent } from 'components/hooks';
import { fetchUserWeekAttendance } from 'api';
import { Direction } from 'types/globalTypes';
import { WeekAttendanceModel } from 'types';
import { getWeekAttendance } from 'ducks/attendance/week-attendance-data/week-attendance-data-creators';
import { months, weekDays } from 'utils/config';

import { Paragraph, SpinnerWrapper } from 'styles';
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
  weekAttendance: WeekAttendanceModel[];
  userId: string;
}

const WeekAttendanceComponent: React.FC<Props> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const [week, setWeek] = useState<number>(0);

  const increaseWeek = () => setWeek((prevCounter) => prevCounter + 1);
  const decreaseWeek = () => setWeek((prevCounter) => prevCounter - 1);

  const weekAttendanceData = useFetch<typeof fetchUserWeekAttendance>(fetchUserWeekAttendance(userId, week), {
    dependencies: [week]
  });
  const { showContent, showNoContent, showLoader, showError } = useShowContent(weekAttendanceData);
  const { payload: weekAttendance } = weekAttendanceData;

  useEffect(() => {
    dispatch(getWeekAttendance(week));
  }, [week]);

  return (
    <MainWrapper>
      {showLoader && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
      {showNoContent && <Paragraph>Brak danych</Paragraph>}
      {showError && <Paragraph>Błąd podczas ładowania</Paragraph>}
      {showContent && weekAttendance && (
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
