import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import styled, { css } from 'styled-components';
import { WeekAttendance } from '../../../types/modelsTypes';
import { CheckedIcon, EmptyIcon, NotCheckedIcon } from '../../../styles/iconStyles';
import { compareDates } from '../../../utils/functions';
import ArrowButton from '../../atoms/ArrowButton/ArrowButton';
import { Direction } from '../../../types/globalTypes';
import { getWeekAttendance } from '../../../actions/attendanceActions';
import { AppTypes } from '../../../types/actionTypes/appActionTypes';

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  grid-template-columns: auto;
  background-color: ${({ theme }) => theme.colors.impactGray};
  grid-gap: 1px;

  ${({ theme }) => theme.mq.hdReady} {
    height: 100px;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: auto;
  }
`;

interface SingleAttendanceWrapperInterface {
  isCurrentDay: boolean;
}

const SingleAttendanceWrapper = styled.div<SingleAttendanceWrapperInterface>`
  background-color: ${({ theme }) => theme.colors.contentBackground};
  border: ${({ isCurrentDay }) => (isCurrentDay ? '1px solid #85BE9B' : 'none')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  transition: background-color 0.4s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
  }

  ${({ theme }) => theme.mq.hdReady} {
    background-color: ${({ theme }) => theme.colors.white};
    padding: 0;

    &:hover {
      background-color: ${({ theme }) => theme.colors.contentBackground};
    }
  }
`;

const DateParagraph = styled.p`
  color: ${({ theme }) => theme.colors.emptyText};
  font-size: 13px;
`;

const iconStyles = css`
  margin-right: 0;
  margin-top: 2rem;
`;

const StyledEmptyIcon = styled(EmptyIcon)`
  ${iconStyles};
`;

const StyledCheckedIcon = styled(CheckedIcon)`
  ${iconStyles};
`;

const StyledNotCheckedIcon = styled(NotCheckedIcon)`
  ${iconStyles};
`;

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
        <ArrowButton direction={Direction.Right} onClick={() => increaseWeek()} />
      </Header>
      <StyledWrapper>
        {weekAttendance.map((attendance) => (
          <SingleAttendanceWrapper isCurrentDay={compareDates(new Date(attendance.date), new Date())} onClick={() => console.log(attendance)}>
            <DateParagraph>{new Date(attendance.date).toLocaleDateString()}</DateParagraph>
            {attendance.wasPresent === null ? <StyledEmptyIcon /> : attendance.wasPresent ? <StyledCheckedIcon /> : <StyledNotCheckedIcon />}
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
